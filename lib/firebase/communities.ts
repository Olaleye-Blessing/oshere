import toast from "react-hot-toast";
import { CreateCommunityProps } from "@/components/buttons/CreateCommunity";
import { createDoc, getDocument, getDocumentRef } from "@/lib/firebase/general";

type Status = "authenticated" | "loading" | "unauthenticated";
type CreateCommunity = (
  status: Status,
  data: CreateCommunityProps
) => Promise<any>;

export const createCommunity: CreateCommunity = async (status, data) => {
  if (status === "loading")
    throw new Error("Please wait some seconds before trying again!");

  if (status === "unauthenticated")
    throw new Error("You need to be logged in!");

  const communityId = `${data.category}-${data.id}`;

  const communityFields = {
    name: data.name,
    coverPhoto: data.poster_path,
  };

  try {
    await createDoc(communityFields, "communities", communityId);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCommunityRef = (id: string) =>
  getDocumentRef(`communities/${id}`);

export const getCommunity = async (ref: any) => {
  try {
    const community = await getDocument({ ref });
    return community;
  } catch (error: any) {
    throw new Error(error);
  }
};
