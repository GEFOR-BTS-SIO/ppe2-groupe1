import { useForm } from "react-hook-form";
import { useState } from "react";

import axios from "axios";
import { User, UserSelect } from "@/components/User";

type MessagerieFormData = {
  message_send : string
}

export default function Messagerie() {
  const { register, handleSubmit, watch } = useForm<MessagerieFormData>();
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<string[]>([]); // Etat (state) de messages

  const handleUserSelected = (userId: any) => {
    console.log(userId)
    setSelectedUserId(userId);
  };

  const onSubmit = async (data:any) => {
    const response = await fetch("http://localhost:8000/apimessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        message_send: data.message_send,
        id_user: selectedUserId ?? null,
      }),
    });


    const jsonResponse = await response.json();
    setMessage(jsonResponse.message);
    // Ajouter le nouveau message à l'état (state) de messages
    setMessagesList([...messagesList, jsonResponse.message]);
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
