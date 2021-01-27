import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
	const [usersState, setUsersState] = useState([]);

	useEffect(() => {
		axios
			.get("https://randomuser.me/api/?results=250")
			.then((response) => {
                console.log(response.data.results);
                setUsersState(response.data.results);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<table className="table table-dark table-hover ">
			<thead>
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Image</th>
					<th scope="col">Name</th>
					<th scope="col">Age</th>
					<th scope="col">Phone</th>
					<th scope="col">Email</th>
				</tr>
			</thead>
			<tbody>
				{usersState.map((user) => (
					<tr>
						<td>{user.id.value}</td>
						<td>
							<img alt="thumbnail" src={user.picture.thumbnail} />
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
	);
};

export default Table;
