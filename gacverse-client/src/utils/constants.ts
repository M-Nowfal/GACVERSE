interface constants {
  app_logo: string,
  api_url: string,
  app_name: "GACVerse",
  split: string
}

export const CONSTANTS: constants = {
  app_logo: "/favicons/favicon.svg",
  api_url: import.meta.env.VITE_API_URL!,
  app_name: "GACVerse",
  split: import.meta.env.VITE_SPLIT!
};
