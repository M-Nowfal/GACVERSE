interface serverConfig {
  port: string;
  version: string;
  node_env: "development" | "production";
  server_url: string;
};

export const SERVER_CONFIG: serverConfig = {
  port: process.env.PORT!,
  version: process.env.VERSION!,
  node_env: process.env.NODE_ENV! as "development" | "production",
  server_url: process.env.SERVER_URL!
};
