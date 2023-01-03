import { UserGroupIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Media {
  src: string;
  title: string;
  overview: string;
}

interface MediasProps {
  medias: Media[];
}

const Main: FC<MediasProps> = ({ medias }) => {
  return (
    <ul className="flex flex-wrap justify-start gap-5 gap-y-8">
      {medias.map((media, index) => {
        return (
          <li key={index} className="w-full mx-auto max-w-[15.625rem]">
            <Link
              href="/"
              className="flex flex-col w-full h-full pb-12 transition-all duration-200 ease-in-out rounded-lg overflow-hidden bg-black bg-opacity-20 shadow-lg ring-white-primary ring-opacity-10 ring-1 hover:shadow-lg hover:bg-opacity-40 focus:ring-red-primary focus:ring-opacity-20 hover:scale-[1.03] focus:scale-[1.03]"
            >
              <figure>
                <Image src={media.src} alt="" width={500} height={500} />
              </figure>
              <div className="px-3">
                <p className="truncate text-white-primary text-opacity-50 my-2">
                  {media.overview}
                </p>
                <h4 className="leading-6">{media.title}</h4>
              </div>
              <div className="px-3 mt-auto">
                <button
                  className="text-red-primary hover:text-white-primary focus:outline focus:outline-white"
                  onClick={() => {
                    alert("You clicked the group button!");
                  }}
                >
                  <UserGroupIcon className="w-4 h-4" />
                </button>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Main;
