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
    // Exemple de liste d'utilisateurs ici va venir le component contenant la liste de toutes les user
    { id: 1, iduser: "1@1.fr", email: "1@1.fr" },
    { id: 2, iduser: "Bob", email: "bob@example.com" },
    { id: 3, iduser: "Charlie", email: "charlie@example.com" },
  ];

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/apiuser",
        {
          iduser: selectedUser.iduser, // Utilisation de l'email de l'utilisateur sélectionné
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
      usersList.find((user) => user.email === parseInt(event.target.value))
    ); // Mise à jour de l'utilisateur sélectionné
  };

  return (
    <div>
      <h1>New message</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Recipient:</label>
          <select
            name="iduser"
            className="form-control"
            defaultValue=""
            onChange={handleChange}
          >
            <option disabled value="">
              Selection le destinataire
            </option>
            {usersList.map((user) => (
              <option key={user.email} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>

          {errors.recipient && <span>Recipient is required</span>}
        </div>
        <div>
          <label>Email:</label>
          <input {...register("iduser", { required: true })} />
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