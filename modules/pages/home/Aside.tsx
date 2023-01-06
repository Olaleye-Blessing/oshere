import { FC } from "react";
import PeopleMedias from "@/components/medias/People";

const Aside: FC = () => {
  return (
    <aside className="overflow-x-hidden px-2 mt-4 md:pl-4 xl:pl-2 xl:bg-black-2 xl:mt-0 xl:h-screen xl:sticky xl:top-0 xl:right-0 xl:flex xl:flex-col">
      <h3 className="xl:mb-1">Popular People</h3>
      <PeopleMedias />
    </aside>
  );
};

export default Aside;
