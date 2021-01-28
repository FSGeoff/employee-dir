import React, { useState, useEffect } from "react";
import axios from "axios";
const Table = () => {
    const [usersState, setUsersState] = useState([]);
    const [usersToDisplay, setUsersToDisplay] = useState([]);
    const [sortDirection, setSortDirection] = useState("asc");
    
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
        setUsersToDisplay(sortedUsers);
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
        setUsersToDisplay(sortedUsers);
    };
// This method is being called on line 108
const handleTheSearch = (event) => {
    // making sure we grab the values being typed
        console.log(event.target.value);
        // placing the typed values inside of a const
        const filter = event.target.value;
        // testing again to assure the data is being grabbed
        console.log(filter)
        // filtering through the data with the filter method
        // with the values being typed
        const filterItems = usersState.filter(item => {
            console.log("okay");
            let values = Object.values(item)
            .join("")
            .toLowerCase();
          return values.indexOf(filter.toLowerCase()) !== -1;
        });
        // rendering the desired names
        setUsersToDisplay(filterItems);
      };
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col w-50 mx-auto">
                        <form onChange={handleTheSearch}>
                            <input
                            // a class name of choice
                            className="form-control"
                            // describing what is going on (searching)
                            type="search"
                            // what will be inside the input area
                            placeholder="Search Employees"
                            aria-label="Search"
                            // what will happen as people type: the e is the action of typing
                            ></input>
                            
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