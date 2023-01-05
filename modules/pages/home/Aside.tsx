import { FC } from "react";
import PeopleMedias from "@/components/medias/People";

const Aside: FC = () => {
  return (
    <aside className="overflow-x-hidden px-2 mt-6 md:pl-4 xl:bg-black-2 xl:mt-0 xl:h-screen xl:sticky xl:top-0 xl:right-0">
      <h3 className="">Popular People</h3>
      <PeopleMedias />
    </aside>
  );
};

export default Aside;
