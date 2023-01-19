import {
  DocumentData,
  DocumentReference,
  arrayRemove,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { getDocumentRef, getLiveDocument, getLiveDocuments } from "./general";

type GeneralData = {
  key: string;
};

type DataString = {
  type: "string";
  value: string | number;
};

type DataArray = {
  type: "array";
  value: string | number | Object;
  nature: "add" | "remove";
};

type UserData = GeneralData & (DataString | DataArray);

export const getUserRef = (userId: string) => getDocumentRef(`users/${userId}`);

const getArrayData = (nature: DataArray["nature"], value: DataArray["value"]) =>
  nature === "add" ? arrayUnion(value) : arrayRemove(value);

export const updateUserData = async (userId: string, data: UserData) => {
  try {
    const userRef = getDocumentRef(`users/${userId}`);

    await updateDoc(userRef, {
      [data.key]:
        data.type === "string"
          ? data.value
          : getArrayData(data.nature, data.value),
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserLiveData = (
  userRef: DocumentReference<DocumentData>,
  callback: any
) => {
  try {
    let unsubscribe = getLiveDocument(userRef, callback);

    return unsubscribe;
  } catch (error: any) {
    throw new Error(error);
  }
};
