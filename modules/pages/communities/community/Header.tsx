import { FC } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import {
  ArrowLeftOnRectangleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useCommunityContext } from "@/hooks/useCommunityContext";
import { updateUserData } from "@/lib/firebase/users";

const Header: FC = () => {
  const router = useRouter();

  const {
    info: { data },
    data: authData,
  } = useCommunityContext();

  const handleLeaveCommunity = async () => {
    try {
      await updateUserData(authData!.user.id!, {
        key: "communities",
        value: data!.id!,
        type: "array",
        nature: "remove",
      });

      toast.success("You have left the community!", {
        id: "leave-community-success",
      });

      router.replace("/communities");
    } catch (error: any) {
      toast.error(error.message, { id: "leave-community-error" });
    }
  };

  return (
    <header className="flex items-center justify-start flex-wrap mb-2 p-2 bg-black-1 bg-opacity-20 ">
      <div className="mr-auto">
        <h1>{data!.name}</h1>
      </div>
      <button
        className="text-red-primary w-6 h-6 inline-block flex-shrink-0 mr-2"
        aria-label={`Leave community`}
        onClick={handleLeaveCommunity}
      >
        <ArrowLeftOnRectangleIcon className="" />
      </button>
      <button
        className="text-[#3c4] flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          document.querySelector(".community__aside")?.classList.toggle("open");
        }}
      >
        <UserGroupIcon className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Header;
