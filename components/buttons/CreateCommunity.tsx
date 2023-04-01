import { FC } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { Category } from "@/interfaces/common";
import { createCommunity } from "@/lib/firebase/communities";
import { updateUserData } from "@/lib/firebase/users";

export interface CreateCommunityProps {
  category: Category;
  id: number;
  name: string;
  poster_path: string;
  useText?: boolean;
  className?: string;
}

const CreateCommunity: FC<CreateCommunityProps> = (props) => {
  const router = useRouter();
  const { status, data } = useSession();

  const handleCreateCommunity = async () => {
    try {
      if (status === "loading")
        throw new Error("Please wait some seconds before trying again!");

      if (status === "unauthenticated")
        throw new Error("You need to be logged in!");

      await createCommunity(props);

      await updateUserData(data!.user.id!, {
        key: "communities",
        value: {
          id: `${props.category}-${props.id}`,
          coverPhoto: props.poster_path,
          name: props.name,
        },
        type: "array",
        nature: "add",
      });

      router.push(`/communities/${props.category}/${props.id}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <button
      className={`mr-2 text-red-primary hover:text-white-primary ${
        props.className || ""
      }`}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await handleCreateCommunity();
      }}
    >
      {props.useText ? (
        "Create Community"
      ) : (
        <>
          <span className="sr-only">Create {props.name} community</span>
          <UserGroupIcon className="w-5 h-5" />
        </>
      )}
    </button>
  );
};

export default CreateCommunity;
