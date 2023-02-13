import { Genre } from "@/components/navigation/genres/Index";

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

export interface MediaTrailer {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface MediaPage {
  adult: boolean;
  backdrop_path: null | string;
  genres: Genre[];
  homepage: string;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: string[];
  production_countries: string[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  tagline: string;
  vote_average: string;
  vote_count: number;
  videos: {
    results: MediaTrailer[];
  };
}

export interface TvMediaPage extends MediaPage {
  created_by: [];
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {};
  name: string;
  next_episode_to_air: {};
  networks: [];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;

  seasons: string[];
  status: string;
  type: string;
}

export interface MovieMediaPage extends MediaPage {
  belongs_to_collection: null;
  budget: number;
  imdb_id: string;
  original_title: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  title: string;
  video: boolean;
}

export interface AuthUser {
  expires: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export interface Bookmark extends Movie, TvShow {
  name: string;
  id: number;
  category: Category;
  description: string;
  poster_path: string;
}
