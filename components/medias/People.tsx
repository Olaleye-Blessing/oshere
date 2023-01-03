import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Person {
  src: string;
  title: string;
  department: string;
  popularity: number;
}

interface MediasProps {
  people: Person[];
}

const People: FC<MediasProps> = ({ people }) => {
  return (
    <ul className="mt-3 flex whitespace-nowrap items-center justify-start overflow-x-scroll scrollbar__hide space-x-5 pr-5 sm:space-x-8 xl:flex-col xl:space-x-0 xl:gap-y-5 xl:max-h-[80%] xl:overflow-auto xl:scrollbar__show xl:overflow-x-hidden xl:px-2">
      {people.map((person) => {
        return (
          <li key={person.title} className="max-w-[18rem]">
            <Link
              href="/"
              className="flex w-full rounded-lg bg-black bg-opacity-20 shadow-lg overflow-hidden"
            >
              <figure className="w-20 bg-[green] relative flex-shrink-0 mr-2 overflow-hidden">
                <Image
                  src={person.src}
                  alt=""
                  width={500}
                  height={500}
                  className="h-full object-cover"
                />
              </figure>
              <div className="truncate">
                <h4 className="truncate mb-0">{person.title}</h4>
                <p className="text-white-primary text-opacity-50 font-semibold text-sm">
                  {person.department}
                </p>
                <p className="mt-6 bg-red bg-opacity-10 text-red-primary max-w-max p-1 font-bold text-xs rounded-sm mb-2">
                  {person.popularity}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default People;
