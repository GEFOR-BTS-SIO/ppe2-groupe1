// component/User.tsx
import axios from "axios";
import { useState, useEffect } from "react";

type UserProps = {
  onUserSelected: (user: any) => void;
};

const User = ({ onUserSelected }: UserProps) => {
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
    const selectedUserId = parseInt(event.target.value); // Récupérer l'ID de l'utilisateur sélectionné
    const selectedUser = users.find((user) => user.id === selectedUserId); // Trouver l'utilisateur correspondant à l'ID sélectionné
    if (selectedUser) {
      onUserSelected(selectedUser);
    }
  };

  return (
    <select onChange={handleUserChange}>
      <option>Select user</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.email}
        </option>
      ))}
    </select>
  );
};

export default User;
