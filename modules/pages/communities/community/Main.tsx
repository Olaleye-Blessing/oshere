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
          <div className="flex flex-col items-center justify-center h-full">
            <p className="error text-red-primary">
              {info.error || "Something went wrong"}
            </p>
          </div>
        )}
      </main>
    </>
  );
};

export default Main;
