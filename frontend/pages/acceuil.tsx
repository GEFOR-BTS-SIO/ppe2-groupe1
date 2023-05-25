import { useEffect, useState } from 'react';

export default function Accueil() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    async function fetchUserEmail() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Une erreur est survenue lors de la récupération de l\'email');
        }

        const data = await response.json();
        setUserEmail(data.email);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserEmail();
  }, []);

  return (
    <div>
      <h1>Bienvenue sur la page daccueil</h1>
      {userEmail && <p>Votre adresse email est : {userEmail}</p>}
    </div>
  );
}
