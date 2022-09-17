import axios from "axios";
import { TMDB_API_KEY, TRAKT_API_KEY } from "../../env";

// const api = axios.create({
//   baseURL: 'https://api.trakt.tv',
//   //   timeout: 1000,
//   headers: {
//     'Content-Type': 'application/json',
//     'trakt-api-key': TRAKT_API_KEY,
//     'trakt-api-version': '2'
//   }
// });

export const tmdbAPi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  //   timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

const searchTmdbShows = (query: string) => {
  return tmdbAPi.get(`/search/tv?query=${query}&api_key=${TMDB_API_KEY}`);
};

const getPopularShows = () => {
  return tmdbAPi.get(`/tv/popular?api_key=${TMDB_API_KEY}`);
};

const getTopRatedShows = () => {
  return tmdbAPi.get(`/tv/top_rated?api_key=${TMDB_API_KEY}`);
};

const getShowsOnTheAir = () => {
  return tmdbAPi.get(`/tv/on_the_air?api_key=${TMDB_API_KEY}`);
};

const getImageApiConfig = async () => {
  return tmdbAPi.get(`/configuration?api_key=${TMDB_API_KEY}`);
};

// const getShowDetails = (id: string | number) => {
//   return api.get(`/shows/${id}?extended=full`);
// };

const getTmdbShowDetails = (tmdbId: number) => {
  return tmdbAPi
    .get(`/tv/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=videos`)
    .then((res) => res.data);
};

const getShowRecommendations = (tmdbId: number) => {
  return tmdbAPi
    .get(`/tv/${tmdbId}/recommendations?api_key=${TMDB_API_KEY}`)
    .then((res) => res.data.results);
};

const getTVGenres = () => {
  return tmdbAPi
    .get(`/genre/tv/list?api_key=${TMDB_API_KEY}`)
    .then((res) => res.data.genres);
};

const getSeasonDetails = (tvId: string, seasonId: string) => {
  return tmdbAPi
    .get(`/tv/${tvId}/season/${seasonId}?api_key=${TMDB_API_KEY}`)
    .then((res) => res.data);
};

type ImageObject = {
  path: string;
  height: number;
  aspect_ratio: number;
};

const getImagesForShow = async (
  tmdbId: number,
  size = 500
): Promise<{ posters: ImageObject[]; backdrops: ImageObject[] }> => {
  try {
    const response = await tmdbAPi.get(
      `/tv/${tmdbId}/images?api_key=${TMDB_API_KEY}`
    );
    const images = response.data;

    const createImageObj = ({ file_path, aspect_ratio, height }) => ({
      path: `https://image.tmdb.org/t/p/w${size}${file_path}`,
      aspect_ratio,
      height,
    });
    const max = 6;
    const posters = images.posters.slice(0, max).map(createImageObj);
    const backdrops = images.backdrops.slice(0, max).map(createImageObj);
    const logos = images.logos.slice(0, max).map(createImageObj);

    return {
      posters: posters,
      backdrops: backdrops,
      logos,
    };
  } catch (error) {
    throw error;
  }
};

const getUrlForImagePath = (filePath: string, size = 500) => {
  return `https://image.tmdb.org/t/p/w${size}${filePath}`;
};

export default {
  getPopularShows,
  getTopRatedShows,
  getShowsOnTheAir,
  getShowRecommendations,
  getImagesForShow,
  getImageApiConfig,
  getTmdbShowDetails,
  searchTmdbShows,
  getUrlForImagePath,
  getTVGenres,
  getSeasonDetails,
};
