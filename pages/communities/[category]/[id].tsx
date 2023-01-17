import { NextPage } from "next";
import { Aside, Main } from "@/modules/pages/communities/community";
import { CommunityProvider } from "@/contexts/Community";

const Community: NextPage = () => {
  return (
    <>
      <CommunityProvider>
        <div className="relative flex items-start h-[calc(100vh-68px)] overflow-hidden md:h-screen">
          <Main />
          <Aside />
        </div>
      </CommunityProvider>
    </>
  );
};

export default Community;
