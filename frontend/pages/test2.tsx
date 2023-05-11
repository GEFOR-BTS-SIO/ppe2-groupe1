import { useForm } from "react-hook-form";
import { useState } from "react";

import axios from "axios";
import { User, UserSelect } from "@/components/User";

type MessagerieFormData = {
  message_send : string
}

export default function Messagerie() {
  const { register, handleSubmit, watch } = useForm<MessagerieFormData>();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<string[]>([]); // Etat (state) de messages

  const handleUserSelected = (user: any) => {
    setSelectedUser(user);
  };
  console.log(selectedUser)
const onSubmit = async (data:MessagerieFormData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/message",
      {
        message_send: data.message_send,
        id_user: selectedUser?.id,
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
        <UserSelect onUserSelected={handleUserSelected}></UserSelect>
        <label>
          Message de test :
          <input {...register("message_send")} />
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </>
  );
}
