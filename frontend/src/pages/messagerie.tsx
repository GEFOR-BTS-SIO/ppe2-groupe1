import { useForm } from "react-hook-form";


export function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {},
   
  });

  const onSubmit = (data) => {
    // Handle form data here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="message">message</label>
      <input type="text" id="message" {...register("message")} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm; 