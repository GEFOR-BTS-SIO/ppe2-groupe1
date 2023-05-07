import axios from "axios";
import { useState, useEffect } from "react";

type UserProps = {
  onUserSelected: (user: any) => void;
};

export default function User({ onUserSelected }: UserProps) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:8000/api/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const parsedResponse = JSON.parse(response.data); // Conversion de la réponse en objet JS
      setUsers(parsedResponse);
    };
    fetchUsers();
  }, []);

  const handleUserChange = (event) => {
    const selectedUser = users.find(
      (user) => user.iduser === event.target.value
    );
    onUserSelected(selectedUser);
  };

  return (
    <select onChange={handleUserChange}>
      <option>Select user</option>
      {users.map((user) => (
        <option key={user.iduser} value={user.iduser}>
          {user.email}
        </option>
      ))}
    </select>
  );
}
