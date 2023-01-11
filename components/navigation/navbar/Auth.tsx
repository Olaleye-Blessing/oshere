import { FC } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Auth: FC = () => {
  const { data: session } = useSession();

  return (
    <div className="border-t border-white-primary border-opacity-40 pt-4 ">
      <button
        className="w-full flex items-center justify-start text-white-primary text-opacity-90 font-semibold hover:text-red-primary"
        onClick={() => (session ? signOut() : signIn())}
      >
        <span className="w-4 h-4 inline-block mr-1 mt-[0.225rem]">
          {session ? (
            <ArrowLeftOnRectangleIcon />
          ) : (
            <ArrowRightOnRectangleIcon />
          )}
        </span>
        {session ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Auth;
