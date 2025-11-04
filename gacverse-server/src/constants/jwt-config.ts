interface jwtConfig {
  jwt_secret: string;
  jwt_expires_in: "1d" | "3d" | "7d" | "15d" | "30d";
}

export const JWT_CONFIG: jwtConfig = {
  jwt_secret: process.env.JWT_SECRET!,
  jwt_expires_in: "7d"
};
