import LoadingIndicator from "@/components/LoadingIndicator";
import { useTMDB } from "@/hooks/useTMDB";
import { Category, MovieMediaPage, TvMediaPage } from "@/interfaces/common";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Detail from "@/modules/pages/media_detail/Index";
import SimilarMedias from "@/modules/pages/media_detail/Similar";

const MediaDetail: NextPage = () => {
  let { query } = useRouter();
  const { category, id } = query;
  const { data, loading, error } = useTMDB<TvMediaPage & MovieMediaPage>(
    category ? `${category === "tvshows" ? "/tv" : "/movie"}/${id}` : ""
  );

  return (
    <>
      <main className="relative h-[calc(100vh-8rem)] px-0 md:h-screen xl:pt-0">
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
