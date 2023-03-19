import { FC } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { Category } from "@/interfaces/common";
import { updateUserData } from "@/lib/firebase/users";

export interface Props {
  bookmark: {
    name: string;
    id: number;
    category: Category;
    overview: string;
    poster_path: string;
  };
}

const BookmarkMedia: FC<Props> = (props) => {
  const { status, data } = useSession();

  const handleBookmarkMedia = async () => {
    try {
      if (status === "loading")
        throw new Error("Please wait some seconds before trying again!");

      if (status === "unauthenticated")
        throw new Error("You need to be logged in!");

      await updateUserData(data!.user.id!, {
        key: "bookmarks",
        value: props.bookmark,
        type: "array",
        nature: "add",
      });

      toast.success("Media bookmarked!");
    } catch (error: any) {
      toast.error(error.message, {
        id: "bookmark-media-error",
      });
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleBookmarkMedia();
      }}
      className="text-red-primary"
    >
      <span className="sr-only">Bookmark {props.bookmark.name}</span>
      <BookmarkIcon className="w-5 h-5" />
    </button>
  );
};

export default BookmarkMedia;
