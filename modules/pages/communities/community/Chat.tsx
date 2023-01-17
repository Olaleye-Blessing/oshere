import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { AuthUser } from "@/interfaces/common";
import { useCommunityContext } from "@/hooks/useCommunityContext";
import { createCommunityMessage } from "@/lib/firebase/communities";

interface Props {}

const Chat: FC<Props> = () => {
  const {
    messages: { ref },
  } = useCommunityContext();
  const { data } = useSession();
  const { user } = data as AuthUser;

  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    let value = message.trim();

    if (!value) return;

    try {
      await createCommunityMessage(ref, {
        from: user.name,
        value,
        createdAt: new Date(),
      });

      setMessage("");
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <form className="mt-auto sticky bottom-0 right-0 left-0 px-2 pr-4 pb-1">
      <div className="mt-1 relative">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="block w-full rounded-md shadow-sm focus:border-red-primary focus:border-opacity-20 focus:ring-red-primary focus:ring-opacity-20 bg-black-2 sm:text-sm resize-y"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="absolute bottom-2 right-2 bg-opacity-40 bg-red-primary rounded-lg pt-[0.15rem] pb-1 px-3 text-sm"
          onClick={handleSendMessage}
          type="button"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default Chat;
