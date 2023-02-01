import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useTMDB } from "@/hooks/useTMDB";
import { Category, MovieMediaPage, TvMediaPage } from "@/interfaces/common";
import Detail from "@/modules/pages/media_detail/Index";
import SimilarMedias from "@/modules/pages/media_detail/Similar";

const MediaDetail: NextPage = () => {
  let { query } = useRouter();
  const { category, id } = query;
  const mediaUrl = category
    ? `${category === "tvshows" ? "/tv" : "/movie"}/${id}`
    : "";
  const { data, loading, error } = useTMDB<TvMediaPage & MovieMediaPage>(
    `${mediaUrl}?append_to_response=videos`
  );

  return (
    <>
      <Head>
        <title>
          Oshere | {data?.title || data?.name || "unknown"}{" "}
          {category === "tvshows" ? "TV Show" : "Movie"}
        </title>
        <meta
          name="description"
          content={data?.overview || ""}
          key="description"
        />
      </Head>
      <main className="relative h-[calc(100vh-8rem)] px-0 md:h-auto md:overflow-x-hidden xl:pt-0">
        {loading ? (
          <LoadingIndicator />
        ) : data ? (
          <Detail media={data} category={category as Category} />
        ) : (
          <p className="error">{error || "unknown"}</p>
        )}
      </main>
      <SimilarMedias category={category as Category} mediaId={id as string} />
    </>
  );
};

export default MediaDetail;
