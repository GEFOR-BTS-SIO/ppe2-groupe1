import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();



  // dans le fichier login.tsx
const onSubmit = async (data) => {
    try {
      
    const response = await axios.post('http://localhost:8000/api/login_check', {
      username: data.username,
      password: data.password,
    });

    // Stocker le token dans le localStorage
    localStorage.setItem('token', response.data.token);

    // Si la connexion réussit, stockez l'état de connexion de l'utilisateur et redirigez-le vers la page de profil
    setIsAuthenticated(true);
    document.cookie = `username=${data.username}; path=/`; // stocker le nom d'utilisateur dans les cookies
    router.push('/acceuil');
  } catch (error) {
    setErrorMessage(error.message);
  }
};

      // Si la connexion réussit, stockez l'état de connexion de l'utilisateur et redirigez-le vers la page de profil
      setIsAuthenticated(true);
      localStorage.setItem('token', response.data.token);
      router.push('/messagerie');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLogout = () => {
    // Réinitialiser l'état de connexion de l'utilisateur et rediriger l'utilisateur vers la page de connexion
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <div>
      {!isAuthenticated && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Username:</label>
            <input type="text" {...register('username', { required: true })} />
            {errors.username && <span>Username is required</span>}
          </div>
          <div>
            <label>Password:</label>
            <input type="password" {...register('password', { required: true })} />
            {errors.password && <span>Password is required</span>}
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          {errorMessage && <div>{errorMessage}</div>}
        </form>
      )}
      {isAuthenticated && (
        <div>
          <p>You are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;