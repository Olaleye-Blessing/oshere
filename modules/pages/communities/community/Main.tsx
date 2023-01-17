import { FC } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import Header from "./Header";
import Messages from "./Messages";
import Chat from "./Chat";
import { useCommunityContext } from "@/hooks/useCommunityContext";

const Main: FC = () => {
  const { info } = useCommunityContext();

  return (
    <>
      <main className="p-0 flex flex-col h-full justify-start">
        {info.data ? (
          <>
            <Header />
            <Messages />
            <Chat />
          </>
        ) : info.loading ? (
          <LoadingIndicator />
        ) : (
          <p className="error">{info.error || "Something went wrong"}</p>
        )}
      </main>
    </>
  );
};

export default Main;
