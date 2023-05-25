import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Pagemess = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedUser, setSelectedUser] = useState(""); // Ajout d'un state pour stocker l'utilisateur sélectionné

  const usersList = [
    // Exemple de liste d'utilisateurs
    { id: 1, user_id: "1@1.fr", email: "1@1.fr" },
    { id: 2, user_id: "Bob", email: "bob@example.com" },
    { id: 3, user_id: "Charlie", email: "charlie@example.com" },
  ];

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages`,
        {
          user_id: selectedUser.user_id, // Utilisation de l'email de l'utilisateur sélectionné
          message_send: data.message_send,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccessMessage("Message sent successfully!");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleChange = (event) => {
    setSelectedUser(
      usersList.find((user) => user.id === parseInt(event.target.value))
    ); // Mise à jour de l'utilisateur sélectionné
  };

  return (
    <div>
      <h1>New message</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Recipient:</label>
          <select
            name="user_id"
            className="form-control"
            defaultValue=""
            onChange={handleChange}
          >
            <option disabled value="">
              Select a recipient
            </option>
            {usersList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.user_id}
              </option>
            ))}
          </select>

          {errors.recipient && <span>Recipient is required</span>}
        </div>
        <div>
          <label>Email:</label>
          <input {...register("email", { required: true })} />
          {errors.email && <span>Email is required</span>}
        </div>
        <div>
          <label>Message:</label>
          <textarea {...register("message_send", { required: true })} />
          {errors.message_send && <span>Message is required</span>}
        </div>
        <div>
          <button type="submit">Send</button>
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        {successMessage && <div>{successMessage}</div>}
      </form>
    </div>
  );
};

export default Pagemess;