import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { TMDBPerson } from "@/interfaces/fetch";
import { TMDB_IMAGE_BASE_URL } from "@/configs/paths";

interface PersonProps {
  person: TMDBPerson;
  liClassName?: string;
  linkClassName?: string;
}

const Person: FC<PersonProps> = ({
  person,
  liClassName = "",
  linkClassName = "",
}) => {
  return (
    <li key={person.id} className={`w-full ${liClassName}`}>
      <Link href="/" className={`person__link ${linkClassName}`}>
        <figure className="w-20 relative flex-shrink-0 mr-2 overflow-hidden">
          <Image
            src={`${TMDB_IMAGE_BASE_URL}/w500${person.profile_path}`}
            alt=""
            width={500}
            height={500}
            className="h-full object-cover"
          />
        </figure>
        <div className="truncate">
          <h4 className="truncate mb-0">{person.name}</h4>
          <p className="text-white-primary text-opacity-50 font-semibold text-sm">
            {person.known_for_department}
          </p>
          <p className="mt-6 bg-red bg-opacity-10 text-red-primary max-w-max p-1 font-bold text-xs rounded-sm mb-2">
            {person.popularity}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Person;
