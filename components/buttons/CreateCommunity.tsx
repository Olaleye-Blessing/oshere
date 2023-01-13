import { FC } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { Category } from "@/interfaces/common";
import { createCommunity } from "@/lib/firebase/communities";

export interface CreateCommunityProps {
  category: Category;
  id: number;
  name: string;
  poster_path: string;
}

const CreateCommunity: FC<CreateCommunityProps> = (props) => {
  const router = useRouter();
  const { status } = useSession();

  const handleCreateCommunity = async () => {
    try {
      await createCommunity(status, props);

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
