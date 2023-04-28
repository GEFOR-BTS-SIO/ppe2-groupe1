import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
 

    fetch('http://localhost:8000/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: data.email,
          password: data.password
        })
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('token', data.token);
        console.log('Token enregistré dans le localStorage : ', data.token);
      })
      .catch(error => console.error('Erreur lors de la requête : ', error));
      
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email:
          <input type="text" {...register("email")} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" {...register("password")} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;