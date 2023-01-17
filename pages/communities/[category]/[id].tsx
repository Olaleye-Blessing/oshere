import { NextPage } from "next";
import { Aside, Main } from "@/modules/pages/communities/community";

const Community: NextPage = () => {
  return (
    <>
      <div className="relative flex items-start h-[calc(100vh-68px)] overflow-hidden md:h-screen">
        <Main />
        <Aside />
      </div>
    </>
  );
};

export default Community;
