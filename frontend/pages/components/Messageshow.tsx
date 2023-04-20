import { useForm } from 'react-hook-form';

export default function Messagesend() {
    const { register, handleSubmit, watch } = useForm();
    const onSubmit = async () => {
        const data = watch();
        const response = await fetch('http://localhost:8000/api/eleve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message_send: data.message_send,
       
            }),
        });
    };
    return (
        <>
        
        </>
    )
}