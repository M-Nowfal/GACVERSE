import bcryptjs from "bcryptjs";

export const hash = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(12);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
}

export const compare = async (password: string, hash: string) => {
  return bcryptjs.compare(password, hash);
}
