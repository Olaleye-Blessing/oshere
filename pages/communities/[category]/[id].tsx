import { NextPage } from "next";
import { useRouter } from "next/router";

const Community: NextPage = () => {
  const router = useRouter();
  console.log(router.query);

  return (
    <>
      <main>
        <h1>Community</h1>
      </main>
    </>
  );
};

export default Community;
