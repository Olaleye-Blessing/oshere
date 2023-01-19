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
        value: `${props.category}-${props.id}`,
        type: "array",
      });

      router.push(`/communities/${props.category}/${props.id}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <button
      className="text-red-primary hover:text-white-primary focus:outline focus:outline-white"
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await handleCreateCommunity();
      }}
    >
      <UserGroupIcon className="w-4 h-4" />
    </button>
  );
};

export default CreateCommunity;
