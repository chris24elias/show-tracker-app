import { useEffect } from "react";
import useAuthStore from "../stores/auth";
import createListener from "../api/firebase/helpers/createListener";
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
    const unsub1 = createListener(
      COLLECTIONS.savedShows,
      {
        constraints: where("owner", "==", currentUserId),
      },
      setMyShows
    );

    return () => {
      [unsub1].forEach((unsub) => {
        unsub();
      });
    };
  }, [currentUserId, setMyShows]);

  return null;
};

export default useDataListeners;
