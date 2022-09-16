import { useEffect } from "react";
import api from "../api";
import { Recommendation } from "../utils/types";
import useSetState from "./useSetState";

type State = {
  recommendations: Recommendation[];
  loading: boolean;
  error: any;
};

const useShowRecommendations = (tmdbId: number) => {
  const [state, setState] = useSetState<State>({
    recommendations: [],
    loading: true,
    error: undefined,
  });
  useEffect(() => {
    if (tmdbId) {
      api.getShowRecommendations(tmdbId).then((response) => {
        setState({
          recommendations: response.data.results,
        });
      });
    }
  }, [tmdbId, setState]);

  return {
    ...state,
  };
};

export default useShowRecommendations;
