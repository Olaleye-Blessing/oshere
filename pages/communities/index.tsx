import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { getDocuments } from "@/lib/firebase/general";
import { Fetching } from "@/interfaces/fetch";
import Communities, { Community } from "@/components/communities/Index";
import LoadingIndicator from "@/components/LoadingIndicator";

const Index: NextPage = () => {
  const [communities, setCommunities] = useState<Fetching<Community[]>>({
    loading: true,
    data: [],
    error: null,
  });

  useEffect(() => {
    const getCommunities = async () => {
      setCommunities((prev) => ({ ...prev, loading: true }));

      try {
        let communities = await getDocuments<Community>("communities");

        let data = [...communities].map((community) => {
          let mediaId = community.id.split("-");

          return {
            ...community.data,
            id: mediaId[1],
            category: mediaId[0],
          };
        });

        setCommunities((prev) => ({ ...prev, data }));
      } catch (error: any) {
        setCommunities((prev) => ({ ...prev, error: error.message }));
      } finally {
        setCommunities((prev) => ({ ...prev, loading: false }));
      }
    };

    getCommunities();
  }, []);

  return (
    <>
      <Head>
        <title>Oshere | Communities</title>
        <meta
          name="description"
          content="Browse through communities"
          key="description"
        />
      </Head>
      <main>
        <h1 className="mb-6">Communities</h1>
        {communities.loading ? (
          <LoadingIndicator />
        ) : communities.error ? (
          <p>{communities.error}</p>
        ) : (
          <Communities communities={communities.data} />
        )}
      </main>
    </>
  );
};

export default Index;
