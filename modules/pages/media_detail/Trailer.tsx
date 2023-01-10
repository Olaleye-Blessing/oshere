import { FC } from "react";
import ReactPlayer from "react-player/youtube";
import { MediaTrailer } from "@/interfaces/common";
import { YOUTUBE_BASE_URL } from "@/configs/paths";

interface TrailerProps extends MediaTrailer {
  youtubeKey: string;
}

const Trailer: FC<TrailerProps> = (props) => {
  return (
    <li className="">
      <ReactPlayer
        url={`${YOUTUBE_BASE_URL}${props.youtubeKey}`}
        controls={true}
        playing={false}
        pip={true}
      />
    </li>
  );
};

export default Trailer;
