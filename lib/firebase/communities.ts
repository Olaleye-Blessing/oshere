import { query, limit, orderBy } from "firebase/firestore";
import { CreateCommunityProps } from "@/components/buttons/CreateCommunity";
import {
  createDoc,
  createDocWithRef,
  getDocument,
  getDocumentRef,
  getDocumentsRef,
  getLiveDocuments,
} from "@/lib/firebase/general";
import { CommunityMessage } from "@/interfaces/community";

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

export const createCommunityMessage = async (
  ref: any,
  data: CommunityMessage
) => {
  try {
    await createDocWithRef(ref, data);
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

export const getCommunityMessagesRef = (id: string) =>
  getDocumentsRef(`communities/${id}/messages`);

export const getCommunityMessages = (ref: any, callback: any) => {
  try {
    const messagesQuery = query(ref, orderBy("createdAt", "desc"), limit(60));
    const unsubscribe = getLiveDocuments(messagesQuery, callback);

    return unsubscribe;
  } catch (error: any) {
    throw new Error(error);
  }
};
