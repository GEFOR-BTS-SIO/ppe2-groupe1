import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import User from "@/components/User";
import Messagerie from "@/components/Messagerie";

const Pagemess = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedUser, setSelectedUser] = useState({}); // Ajout d'un state pour stocker l'utilisateur sélectionné

  // Fonction pour mettre à jour le state selectedUser
  const handleUserSelected = (user) => {
    setSelectedUser(user);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/messages",
        {
          id_user: selectedUser.email, // Utilisation de l'email de l'utilisateur sélectionné
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

  return (
    <div>
      <Messagerie></Messagerie>
      <h1>New message</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Recipient:</label>
          {/* Passer la fonction handleUserSelected au composant User */}
          <User onUserSelected={handleUserSelected} />
          {errors.recipient && <span>Recipient is required</span>}
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
