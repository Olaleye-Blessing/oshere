import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
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
  nature: "add" | "remove";
};

type UserData = GeneralData & (DataString | DataArray);

const getArrayData = (
  nature: DataArray["nature"],
  value: GeneralData["value"]
) => (nature === "add" ? arrayUnion(value) : arrayRemove(value));

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
