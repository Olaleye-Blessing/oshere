import { FC } from "react";
import {
  ArrowLeftOnRectangleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Header: FC = () => {
  return (
    <header className="flex items-center justify-start flex-wrap mb-2 p-2 bg-black-1 bg-opacity-20 ">
      <div className="mr-auto">
        <h1>Community Title</h1>
      </div>
      <button
        className="text-red-primary w-6 h-6 inline-block flex-shrink-0 mr-2"
        aria-label={`Leave community`}
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
