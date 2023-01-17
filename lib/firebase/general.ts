import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebase";
import { getDoc } from "@firebase/firestore";

type CreateDoc = (data: any, name: string, id: string) => Promise<void>;

export const createDoc: CreateDoc = async (data, name, id) => {
  try {
    const docRef = doc(db, name, id);
    await setDoc(docRef, data, { merge: true });
  } catch (error: any) {
    throw new Error(error);
  }
};

interface Document<Doc> {
  id: string;
  data: Doc;
}

type Documents<Doc> = Document<Doc>[];

export const getDocuments = async <Doc>(name: string) => {
  const querySnapshot = await getDocs(collection(db, name));

  let docs: Documents<Doc> = [];

  querySnapshot.forEach((doc) => {
    docs.push({
      id: doc.id,
      data: doc.data() as Doc,
    });
  });

  return docs;
};

export const getDocumentRef = (path: string) => doc(db, path);

export const getDocument = async ({
  path,
  ref,
}: {
  path?: string;
  ref?: any;
}) => {
  if (!path && !ref)
    throw new Error("You need to provide a path or a reference!");

  let docRef = path ? getDocumentRef(path) : ref;

  try {
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return {
      id: docSnap.id,
      data: docSnap.data(),
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
