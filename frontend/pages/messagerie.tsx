import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserSelect } from "@/components/Users";

type Message = {
  id: number;
  content: string;
  receiverId: number;
  sender: number;
};

type MessagerieFormData = {
  content: string;
  receiverId: number;
  sender_id: number;
};

const queryClient = new QueryClient();

export function Messagerie() {
  const { register, handleSubmit, reset } = useForm<MessagerieFormData>();
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>();

  const { data: messagesListData = [], isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    refetchInterval: 1000,
  });

  async function fetchMessages() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/apiconversation?receiverId=${selectedUserId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  }

  const handleUserSelected = (userId: number) => {
    setSelectedUserId(userId);
  };

  const onSubmit = async (data: MessagerieFormData) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/apimessage`,
      {
        content: data.content,
        receiverId: selectedUserId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const newMessage: Message = response.data;

    // Ajouter le nouveau message à l'état (state) de messages
    setMessagesList([...messagesList, newMessage]);

    reset();
  };

return (
  <div className="flex flex-col">
    {messagesListData.map((message) => (
      <div
        key={message.id}
        className={`flex ${
          message.sender != selectedUserId ? "justify-start" : "justify-end"
        } mb-2`}
      >
        <p
          className={`${
            message.sender != selectedUserId
              ? "bg-blue-300 text-white justify-start"
              : "bg-gray-300 justify-end"
          } py-2 px-4 rounded-lg ${
            message.sender != selectedUserId ? "mr-2" : "ml-2"
          }`}
        >
          {message.content}
        </p>
      </div>
    ))}
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center mt-4">
      <UserSelect onUserSelected={handleUserSelected} />
      <label className="block mb-2 ml-4">
        Message de test:
        <input
          {...register("content")}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded ml-4"
      >
        Envoyer
      </button>
    </form>
    <ReactQueryDevtools initialIsOpen={false} />
  </div>
);
}

// Enveloppez votre application avec QueryClientProvider
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Messagerie />
    </QueryClientProvider>
  );
}

export default App;