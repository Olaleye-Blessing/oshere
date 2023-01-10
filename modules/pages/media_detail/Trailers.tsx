import { FC } from "react";
import ReactPlayer from "react-player";
import { MediaPage } from "@/interfaces/common";
import { YOUTUBE_BASE_URL } from "@/configs/paths";
import Trailer from "./Trailer";

const types = ["Trailer", "Teaser", "Clip"];

interface TrialerProps extends Pick<MediaPage, "videos"> {}

const Trailers: FC<TrialerProps> = ({ videos }) => {
  const youtubeVideos =
    videos?.results?.filter((video) => video.site === "YouTube") || [];

  let trailers = youtubeVideos
    .filter((video) => types.includes(video.type))
    .filter(({ key }) => ReactPlayer.canPlay(`${YOUTUBE_BASE_URL}${key}`))
    .map((trailer) => ({
      ...trailer,
      youtubeKey: trailer.key,
    }));

  if (trailers.length === 0) return null;

  return (
    <section className="mt-5">
      <h3>Videos</h3>
      <ul className="mt-3 flex whitespace-nowrap justify-start overflow-x-scroll scrollbar__hide space-x-5 pr-5 sm:space-x-8">
        {trailers.map((trailer) => (
          <Trailer {...trailer} key={trailer.key} />
        ))}
      </ul>
    </section>
  );
};

export default Trailers;
