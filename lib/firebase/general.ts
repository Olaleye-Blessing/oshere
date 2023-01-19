import {
  addDoc,
  doc,
  DocumentData,
  setDoc,
  collection,
  getDocs,
  getDoc,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
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

export const createDocWithRef = async (ref: any, data: any) => {
  try {
    await addDoc(ref, data);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getDocumentsRef = (path: string) => collection(db, path);

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

export const getLiveDocuments = (ref: any, callback: any) => {
  const unsubscribe = onSnapshot(
    ref,
    (querySnapshot: QuerySnapshot<DocumentData>) => {
      const docs: any[] = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });

      callback(docs);
    }
  );

  return unsubscribe;
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

export const getLiveDocument = (ref: any, callback: any) => {
  const unsubscribe = onSnapshot(ref, (doc: any) => {
    callback(doc.data());
  });

  return unsubscribe;
};
