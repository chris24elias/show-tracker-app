import {
  DocumentData,
  DocumentSnapshot,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../initFirebase";

const createDocListener = (docPath: string, callback: (data) => void) => {
  if (!docPath) {
    console.warn("MUST SPECIFY DOCUMENT PATH");
    return () => {};
  }

  const handleData = (document: DocumentSnapshot<DocumentData>) => {
    try {
      if (!document) {
        return;
      }
      const data = {
        documentId: document.id,
        ...document.data(),
      };

      if (callback) {
        callback(data);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const ref = doc(firestore, docPath);

  const unsubscribe = onSnapshot(ref, handleData);

  return unsubscribe;
};

export default createDocListener;
