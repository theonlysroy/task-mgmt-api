import bcrypt from "bcryptjs";

export const isPasswordCorrect = async (password: string, passwordHash: string): Promise<boolean> => {
  return await bcrypt.compare(password, passwordHash);
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};
