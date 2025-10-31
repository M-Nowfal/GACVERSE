interface dbConfig {
  conn_uri: string;
  db_name: string;
  page_limit: number;
};

export const DB_CONFIG: dbConfig = {
  conn_uri: process.env.DB_URI!,
  db_name: process.env.DB_NAME!,
  page_limit: 15
};
