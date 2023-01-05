export type Category = "movies" | "tvshows";

interface Media {
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TvShow extends Media {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
}

export interface Movie extends Media {
  adult: boolean;
  original_title: string;
  release_date: string;
  title: string;
  video: false;
}
