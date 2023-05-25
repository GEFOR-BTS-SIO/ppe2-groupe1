import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {get, useApi} from '../lib/api'

export default function MessageSends() {

  const { register, handleSubmit, watch } = useForm();
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState<string[]>([]); // Etat (state) de messages



  const { get } = useApi => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      message_send: data.message_send,
      user: data.user,
    }),
  });
  const jsonResponse = await response.json();
  setMessage(jsonResponse.message);
  console.log(message)
  // Ajouter le nouveau message à l'état (state) de messages
  setMessagesList([...messagesList, jsonResponse.message]);
};



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
