import { useForm } from "react-hook-form";
import { useState } from "react";
import User from "@/components/User";
import axios from "axios";


export default function Messagerie() {
  const { register, handleSubmit, watch } = useForm();
  const [selectedUser, setSelectedUser] = useState({});
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<string[]>([]); // Etat (state) de messages

  const handleUserSelected = (user: any) => {
    setSelectedUser(user);
  };
const onSubmit = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/message",
      {
        message_send: data.message_send,
        id_user: selectedUser.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setMessage(response.data.message);
    console.log(message);
    // Ajouter le nouveau message à l'état (state) de messages
    setMessagesList([...messagesList, response.data.message]);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <>
      {messagesList.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <User onUserSelected={handleUserSelected}></User>
        <label>
          Message de test :
          <input {...register("message_send")} />
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </>
  );
}
