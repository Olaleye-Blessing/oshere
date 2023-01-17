import { FC } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";

const message = {
  from: "user1",
  value: "Hello there",
  createdAt: "2021-01-15T12:12:12.000Z",
};

const Messages: FC = () => {
  const messages = {
    loading: false,
    error: null,
    data: Array(10).fill(message),
  };

  if (messages.loading) return <LoadingIndicator />;

  if (messages.error) return <p className="error">{messages.error}</p>;

  return (
    <ul className="px-2 overflow-y-auto">
      {messages.data?.map((message, index) => (
        <li
          key={index}
          className={`flex items-start justify-start w-[90%] max-w-md mb-5 ${
            index % 2 === 0 ? "ml-auto" : "mr-auto"
          }`}
        >
          <figure className="w-6 h-6 border border-white border-opacity-30 rounded-full flex items-center justify-center text-lg mr-1 p-3">
            {message.from[0].toUpperCase()}
          </figure>
          <div className="bg-black-2 bg-opacity-70 rounded-md p-2 w-full">
            <p className="text-xs text-red-primary text-opacity-60">
              ~{message.from}
            </p>
            <p>{message.value}</p>
            <div className="flex items-center justify-between text-xs mt-3 text-white-primary text-opacity-30">
              <p>15/01/2023</p>
              <p>12:12</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Messages;
