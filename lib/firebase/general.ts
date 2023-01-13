import { doc, setDoc } from "firebase/firestore";
import { db } from "@/configs/firebase";

type CreateDoc = (data: any, name: string, id: string) => Promise<void>;

export const createDoc: CreateDoc = async (data, name, id) => {
  try {
    const docRef = doc(db, name, id);
    await setDoc(docRef, data, { merge: true });
  } catch (error: any) {
    throw new Error(error);
  }
};
