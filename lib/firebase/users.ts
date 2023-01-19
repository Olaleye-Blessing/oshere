import { arrayUnion, updateDoc } from "firebase/firestore";
import { getDocumentRef } from "./general";

type GeneralData = {
  key: string;
  value: string | number;
};

type DataString = {
  type: "string";
};

type DataArray = {
  type: "array";
};

type UserData = GeneralData & (DataString | DataArray);

export const updateUserData = async (userId: string, data: UserData) => {
  try {
    const userRef = getDocumentRef(`users/${userId}`);

    await updateDoc(userRef, {
      [data.key]: data.type === "string" ? data.value : arrayUnion(data.value),
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
