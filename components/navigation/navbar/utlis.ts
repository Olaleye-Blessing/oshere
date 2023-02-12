import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
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
import { UserIcon as UserIconSolid } from "@heroicons/react/24/solid";
import { UserIcon as UserIconOutline } from "@heroicons/react/24/outline";
import {
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Props as PageProp } from "./Page";

export interface List {
  header: string;
  pages: PageProp[];
}

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

const authenticatedPages: List["pages"] = [
  {
    label: "Profile",
    icon: UserIconOutline,
    activeIcon: UserIconSolid,
    path: "/profile",
  },
  {
    label: "Sign out",
    onClick: signOut,
    icon: ArrowLeftOnRectangleIcon,
  },
];

const unauthenticatedPages: List["pages"] = [
  {
    label: "Sign in",
    onClick: signIn,
    icon: ArrowRightOnRectangleIcon,
  },
];

export const getUserPages = (authenticated: Session | null) =>
  authenticated ? authenticatedPages : unauthenticatedPages;
