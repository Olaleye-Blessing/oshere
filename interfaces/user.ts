import { CommunityMetadata } from "./community";

export interface User {
  communities: CommunityMetadata[];
  email: string;
  image: string;
  name: string;
  emailVerified: boolean;
}
