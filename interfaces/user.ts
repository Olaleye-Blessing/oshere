import { CommunityMetadata } from "./community";
import { Bookmark } from "@/interfaces/common";

export interface User {
  communities: CommunityMetadata[];
  bookmarks: Bookmark[];
  email: string;
  image: string;
  name: string;
  emailVerified: boolean;
}
