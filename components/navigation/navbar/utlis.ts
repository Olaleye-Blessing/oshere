import {
  HomeIcon as HomeIconOutline,
  AcademicCapIcon as CommunitiesIconOutline,
  TvIcon as TvIconOutline,
  FilmIcon as MoviesIconOutline,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  AcademicCapIcon as CommunitiesIconSolid,
  TvIcon as TvIconSolid,
  FilmIcon as MoviesIconSolid,
} from "@heroicons/react/24/solid";

export const generalPages = [
  {
    header: "MENU",
    pages: [
      {
        label: "Home",
        icon: HomeIconOutline,
        activeIcon: HomeIconSolid,
        path: "/",
      },
      {
        label: "Communities",
        icon: CommunitiesIconOutline,
        activeIcon: CommunitiesIconSolid,
        path: "/communities",
      },
    ],
  },
];

export const categoryPages = [
  {
    header: "MEDIA",
    pages: [
      {
        label: "Tv Shows",
        icon: TvIconOutline,
        activeIcon: TvIconSolid,
        path: "/?category=tvshows",
      },
      {
        label: "Movies",
        icon: MoviesIconOutline,
        activeIcon: MoviesIconSolid,
        path: "/?category=movies",
      },
    ],
  },
];
