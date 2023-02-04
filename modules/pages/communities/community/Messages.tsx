import { FC, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useCommunityContext } from "@/hooks/useCommunityContext";
import {
  getCommunityMessages,
  getCommunityMessagesRef,
} from "@/lib/firebase/communities";
import { AuthUser } from "@/interfaces/common";
import { ReceivedDate, SentDate } from "@/interfaces/community";

const Messages: FC = () => {
  const { data } = useSession();
  const { user } = data as AuthUser;
  const { messages, info, dispatch } = useCommunityContext();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!info.data) return;

    const messagesRef = getCommunityMessagesRef(info.data.id);

    dispatch({
      type: "SET_REF",
      payload: {
        key: "messages",
        ref: messagesRef,
      },
    });

    const unsubscribe = getCommunityMessages(messagesRef, (messages: any) => {
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          key: "messages",
          data: (messages as Array<any>).reverse(),
        },
      });

      // wait for the messages to render before scrolling.
      // this is a hacky solution to scroll to the bottom of the messages
      timeoutId = setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 10);
    });

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info.data]);

  if (messages.loading) return <LoadingIndicator />;

  if (messages.error) return <p className="error">{messages.error}</p>;

  return (
    <ul data-type="messages" className="px-2 overflow-y-auto relative">
      {messages.data?.map((message, index) => {
        const date = new Date(
          (message.createdAt as ReceivedDate).seconds * 1000
        );

        return (
          <li
            key={index}
            className={`flex items-start justify-start w-[90%] max-w-md mb-5 ${
              user.name === message.from ? "ml-auto" : "mr-auto"
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
              <time
                dateTime={date.toString()}
                className="flex items-center justify-between text-xs mt-3 text-white-primary text-opacity-30"
              >
                <span>{date.toLocaleDateString()}</span>
                <span>{date.toTimeString().split(" ")[0]}</span>
              </time>
            </div>
          </li>
        );
      })}
      <div ref={lastMessageRef} className="h-[0.1px] w-full"></div>
    </ul>
  );
};

export default Messages;
