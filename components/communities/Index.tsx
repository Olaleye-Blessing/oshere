import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { TMDB_IMAGE_BASE_URL } from "@/configs/paths";

export type Community = {
  id: string;
  category: string;
  name: string;
  coverPhoto: string;
};

interface CommunitiesProps {
  communities: Community[];
}

const Index: FC<CommunitiesProps> = ({ communities }) => {
  if (communities.length === 0) return <p>No communities found</p>;

  return (
    <ul className="communties">
      {communities.map((community) => (
        <li key={community.id} className="w-full">
          <Link
            href={`/communities/${community.category}/${community.id}`}
            className="flex flex-col w-full h-full pb-12 transition-all duration-200 ease-in-out rounded-lg overflow-hidden bg-black bg-opacity-20 shadow-lg ring-white-primary ring-opacity-10 ring-1 hover:shadow-lg hover:bg-opacity-40 focus:ring-red-primary focus:ring-opacity-20 hover:scale-[1.03] focus:scale-[1.03]"
          >
            <figure className="w-full overflow-hidden flex justify-center">
              <Image
                src={`${TMDB_IMAGE_BASE_URL}/original${community.coverPhoto}`}
                alt=""
                width={500}
                height={500}
                className="object-cover w-full"
              />
            </figure>
            <div className="mt-3 px-3">
              <h4 className="leading-6 text-xl">{community.name}</h4>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Index;
