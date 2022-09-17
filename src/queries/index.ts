import { useQuery } from "react-query";
import api from "../api";
import { Recommendation } from "../utils/types";

export const useShowDetails = (tmdbId: number) =>
  useQuery(["showDetails", tmdbId], () => api.getTmdbShowDetails(tmdbId));

export const useShowImages = (tmdbId: number) =>
  useQuery(["showImages", tmdbId], () => api.getImagesForShow(tmdbId));

export const useShowRecommendations = (tmdbId: number) =>
  useQuery<Recommendation[]>(["showRecs", tmdbId], () =>
    api.getShowRecommendations(tmdbId)
  );

export const useSeasonDetails = (tvId: any, seasonId: any) =>
  useQuery(["seasonDetails", tvId, seasonId], () =>
    api.getSeasonDetails(tvId, seasonId)
  );

export const useTVGenres = () => useQuery("TVGenres", api.getTVGenres);

export const usePopularShows = () => useQuery("popular", api.getPopularShows);

export const useTopRatedShows = () =>
  useQuery("topRated", api.getTopRatedShows);

export const useOnTheAirShows = () =>
  useQuery("onTheAir", api.getShowsOnTheAir);

export const useAiringTodayShows = () =>
  useQuery("getAiringTodayShows", api.getAiringTodayShows);
