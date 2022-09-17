import { useEffect } from "react";
import useAuthStore from "../stores/auth";
import createListener, {
  createListener2,
} from "../api/firebase/helpers/createListener";
import { where } from "../api/firebase/helpers";
import useDataStore from "../stores/data";
import { COLLECTIONS } from "../api/firebase/utils";

// interface useListenersProps {}

const useDataListeners = () => {
  const currentUserId = useAuthStore((state) => state.user?.uid);
  const setMyShows = useDataStore((state) => state.setMyShows);

  useEffect(() => {
    // my shows
    if (!currentUserId) {
      return;
    }
    return createListener2(COLLECTIONS.savedShows)
      .where("owner", "==", currentUserId)
      .subscribe(setMyShows);
  }, [currentUserId, setMyShows]);

  return null;
};

export default useDataListeners;
