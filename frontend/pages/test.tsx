return (
  <div className="flex flex-col">
    {messagesListData.map((message: Message) => (
      <div
        key={message.id}
        className={`flex justify-${
          message.sender_id === selectedUserId ? "start" : "end"
        } mb-2`}
      >
        <p
          className={`bg-gray-300 py-2 px-4 rounded-lg ${
            message.sender_id === selectedUserId ? "ml-auto" : "mr-auto"
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
