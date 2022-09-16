export type TraktSearchResult = {
  type: string;
  show: TraktShowObject;
  score: number;
};

type IDS = {
  imdb: string;
  slug: string;
  tmdb: number;
  trakt: number;
  tvdb: number;
  tvrage: any;
};

export type TraktShowObject = {
  ids: IDS;
  title: string;
  year: number;
};

export type FixedTraktShowObject = TraktShowObject & {
  images?: any;
  poster?: string;
};

export type TraktShowObjectDetails = TraktShowObject & {
  overview: string;
  firest_aired: string;
  airs: {
    day: string;
    time: string;
    timezone: string;
  };
  runtime: number;
  certification: string;
  network: string;
  country: string;
  updated_at: string;
  trailer: string;
  homepage: string;
  status: string;
  rating: number;
  votes: number;
  comment_count: number;
  language: string;
  available_translations: string[];
  genres: string[];
  aired_episodes: number;
};

export type SavedShowStatus =
  | "watching"
  | "completed"
  | "on hold"
  | "dropped"
  | "plan to watch";

export type SavedShow = {
  id: string; // document id
  tmdbId: string;
  owner: string;
  status: SavedShowStatus;
  poster_path: string;
  first_air_date: string;
  name: string;
  date_added: {
    seconds: number;
  };
  date_modified: {
    seconds: number;
  };
};

export type TMDBSearchResponse = {
  page: number;
  results: TMDBSearchResult[];
  total_results: number;
  total_pages: number;
};

export type TMDBSearchResult = {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
};

export type Recommendation = {
  id: number;
  name: string;
};

export type TMDBShowDetails = {
  backdrop_path: string;
  created_by: [
    {
      id: 9813;
      credit_id: "5256c8c219c2956ff604858a";
      name: "David Benioff";
      gender: 2;
      profile_path: "/xvNN5huL0X8yJ7h3IZfGG4O2zBD.jpg";
    }
  ];
  episode_run_time: [60];
  first_air_date: string;
  genres: [
    {
      id: 10765;
      name: "Sci-Fi & Fantasy";
    }
  ];
  homepage: string;
  id: 1399;
  in_production: false;
  languages: ["en"];
  last_air_date: string;
  last_episode_to_air: {
    air_date: "2019-05-19";
    episode_number: 6;
    id: 1551830;
    name: "The Iron Throne";
    overview: "In the aftermath of the devastating attack on King's Landing, Daenerys must face the survivors.";
    production_code: "806";
    season_number: 8;
    still_path: "/3x8tJon5jXFa1ziAM93hPKNyW7i.jpg";
    vote_average: 4.8;
    vote_count: 106;
  };
  name: string;
  next_episode_to_air: null;
  networks: [
    {
      name: "HBO";
      id: 49;
      logo_path: "/tuomPhY2UtuPTqqFnKMVHvSb724.png";
      origin_country: "US";
    }
  ];
  number_of_episodes: 73;
  number_of_seasons: 8;
  origin_country: ["US"];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: 369.594;
  poster_path: string;
  production_companies: [
    {
      id: 76043;
      logo_path: "/9RO2vbQ67otPrBLXCaC8UMp3Qat.png";
      name: "Revolution Sun Studios";
      origin_country: "US";
    }
  ];
  production_countries: [
    {
      iso_3166_1: "GB";
      name: "United Kingdom";
    }
  ];
  seasons: [
    {
      air_date: "2010-12-05";
      episode_count: 64;
      id: 3627;
      name: "Specials";
      overview: "";
      poster_path: "/kMTcwNRfFKCZ0O2OaBZS0nZ2AIe.jpg";
      season_number: 0;
    }
  ];
  spoken_languages: [
    {
      english_name: "English";
      iso_639_1: "en";
      name: "English";
    }
  ];
  status: string;
  tagline: string;
  type: string;
  vote_average: 8.3;
  vote_count: 11504;
};
