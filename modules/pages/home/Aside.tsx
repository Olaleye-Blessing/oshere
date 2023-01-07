import { FC } from "react";
import PeopleMedias from "@/components/medias/People";

const Aside: FC = () => {
  return (
    <aside className="aside">
      <h3 className="xl:mb-1">Popular People</h3>
      <PeopleMedias />
    </aside>
  );
};

export default Aside;
