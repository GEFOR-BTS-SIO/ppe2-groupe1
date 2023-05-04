// component/Messagerie.tsx
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Messagerie() {
  const { register, handleSubmit, watch } = useForm();
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState<string[]>([]); // Etat (state) de messages

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:8000/apiuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        message_send: data.message_send,
        user: data.user,
      }),
    });
    const jsonResponse = await response.json();
    setMessage(jsonResponse.message);
    console.log(message);
    // Ajouter le nouveau message à l'état (state) de messages
    setMessagesList([...messagesList, jsonResponse.message]);
  };
console.log(localStorage);
  return (
    <>

      {messagesList.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Message de test :
          <input {...register("message_send")} />
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </>
  );
}
