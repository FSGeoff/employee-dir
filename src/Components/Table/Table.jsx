import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
	const [usersState, setUsersState] = useState([]);
	const [usersToDisplay, setUsersToDisplay] = useState([]);
	const [sortDirection, setSortDirection] = useState("asc");
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		axios
			.get("https://randomuser.me/api/?results=250")
			.then((response) => {
				console.log(response.data.results);
				setUsersState(response.data.results);
				setUsersToDisplay(response.data.results);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		let tempUsers = [...usersState];
		const filteredUsers = tempUsers.filter((user) => {
			return user.dob.age.includes(searchTerm);
		});

		setUsersState(filteredUsers);
		console.log("current state:", usersState);
		console.log("filtered users:", filteredUsers);
	};

	const sortByCountry = () => {
		if (sortDirection === "asc") {
			sortByCountryAsc();
			setSortDirection("desc");
		} else {
			sortByCountryDesc();
			setSortDirection("asc");
		}
	};

	const sortByCountryAsc = () => {
		let tempUsers = [...usersState];
		const sortedUsers = tempUsers.sort((a, b) => {
			const aVal = a.location.country;
			const bVal = b.location.country;
			if (aVal < bVal) {
				return -1;
			}
			if (aVal > bVal) {
				return 1;
			}
			return 0;
		});
		console.log(tempUsers);
		setUsersState(sortedUsers);
	};
	const sortByCountryDesc = () => {
		let tempUsers = [...usersState];
		const sortedUsers = tempUsers.sort((a, b) => {
			const aVal = a.location.country;
			const bVal = b.location.country;
			if (aVal > bVal) {
				return -1;
			}
			if (aVal < bVal) {
				return 1;
			}
			return 0;
		});
		console.log(tempUsers);
		setUsersState(sortedUsers);
	};

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col w-50 mx-auto">
						<form onSubmit={handleSubmit}>
							<input
								type="number"
								placeholder="Enter Age to filter"
								name="searchTerm"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							></input>
							<button type="button" class="btn btn-primary">
								Search
							</button>
						</form>
					</div>
				</div>
			</div>
			<table className="table table-dark table-hover ">
				<thead>
					<tr>
						<th scope="col" onClick={sortByCountry}>
							Country
						</th>
						<th scope="col">Image</th>
						<th scope="col">Name</th>
						<th scope="col">Age</th>
						<th scope="col">Phone</th>
						<th scope="col">Email</th>
					</tr>
				</thead>
				<tbody>
					{usersToDisplay.map((user, index) => (
						<tr key={index}>
							<td>{user.location.country}</td>
							<td>
								<img
									alt={user.name.first}
									src={user.picture.thumbnail}
								/>
							</td>
							<td>
								{user.name.first} {user.name.last}
							</td>
							<td>{user.dob.age}</td>
							<td>{user.phone}</td>
							<td>{user.email}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Table;
