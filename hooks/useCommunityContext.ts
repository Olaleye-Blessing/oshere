import { useContext } from "react";
import { CommunityContext } from "@/contexts/Community";

export const useCommunityContext = () => {
  let context = useContext(CommunityContext);

  if (context === undefined) {
    throw new Error("useCommunityContext must be within CommunityProvider");
  }

  return context;
};
