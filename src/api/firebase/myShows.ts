import useAuthStore from "../../stores/auth";
import { SavedShow, SavedShowStatus } from "../../utils/types";
import { COLLECTIONS } from "./utils";
import {
  collection,
  serverTimestamp,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../initFirebase";

export const addShow = (data: {
  status: SavedShowStatus;
  tmdbId: string;
  poster_path: string;
  name: string;
  first_air_date: string;
}) => {
  const currentUserId = useAuthStore.getState().user?.uid;
  if (!currentUserId) {
    throw new Error("no user id");
  }

  return addDoc(collection(firestore, COLLECTIONS.savedShows), {
    owner: currentUserId,
    date_added: serverTimestamp(),
    date_modified: serverTimestamp(),
    ...data,
  });
};

export const updateStatus = (documentId, newStatus: SavedShowStatus) => {
  if (!documentId || !newStatus) {
    throw new Error("missing doc id or new status");
  }
  let ref = doc(firestore, `${COLLECTIONS.savedShows}/${documentId}`);
  return updateDoc(ref, {
    status: newStatus,
    date_modified: serverTimestamp(),
  });
};
