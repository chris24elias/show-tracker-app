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
  return tmdbAPi.get(`/tv/${tmdbId}?api_key=${TMDB_API_KEY}`);
};

const getShowRecommendations = (tmdbId: number) => {
  return tmdbAPi.get(`/tv/${tmdbId}/recommendations?api_key=${TMDB_API_KEY}`);
};

const getImagesForShow = (
  tmdbId: number,
  size = 500
): Promise<{ posters: any[]; backdrops: any[] }> => {
  return new Promise((resolve, reject) => {
    try {
      tmdbAPi
        .get(`/tv/${tmdbId}/images?api_key=${TMDB_API_KEY}`)
        .then((response) => {
          const images = response.data;

          // const posterFilePath =
          //   images.posters && images.posters.length > 0 ? images.posters[0].file_path : undefined;
          // // const file_size = get().config.poster_sizes
          // const posterPath = posterFilePath
          //   ? `https://image.tmdb.org/t/p/w500${posterFilePath}`
          //   : undefined;

          const posters = images.posters.map(
            ({ file_path, aspect_ratio, height }) => ({
              path: `https://image.tmdb.org/t/p/w${size}${file_path}`,
              aspect_ratio,
              height,
            })
          );
          const backdrops = images.backdrops.map(
            ({ file_path, aspect_ratio, height }) => ({
              path: `https://image.tmdb.org/t/p/w${size}${file_path}`,
              aspect_ratio,
              height,
            })
          );

          resolve({
            posters,
            backdrops,
          });
        });
    } catch (error) {
      reject(error);
    }
  });
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
};
