import { useEffect } from "react";
import api from "../api";
import useSetState from "./useSetState";

type ImageObject = {
  path: string;
  height: number;
  aspect_ratio: number;
};

type State = {
  posters: ImageObject[];
  backdrops: ImageObject[];
  logos: ImageObject[];
};

const useShowImages = (tmdbId: number) => {
  const [state, setState] = useSetState<State>({
    posters: [],
    backdrops: [],
    logos: [],
  });

  useEffect(() => {
    const fetchImages = async () => {
      if (tmdbId) {
        const response = await api.getImagesForShow(tmdbId);

        // console.log("images", response);
        setState({
          posters: response.posters.slice(0, 5),
          backdrops: response.backdrops.slice(0, 5),
        });
      }
    };
    fetchImages();
  }, [tmdbId, setState]);

  return {
    ...state,
  };
};

export default useShowImages;
