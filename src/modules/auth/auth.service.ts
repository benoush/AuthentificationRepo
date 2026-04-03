import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import { findUserByEmail, createUser, findUserById } from "./auth.repository";
import { RegisterInput, LoginInput } from "./auth.schema";
import { SignOptions } from "jsonwebtoken";



export const register = async (data: RegisterInput): Promise<{ id: string; email: string }> => {
  const existing = await findUserByEmail(data.email);
  if (existing) throw new Error("Email déjà utilisé");

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await createUser(data.email, hashedPassword);

  return { id: user.id as string, email: user.email };
};

export const login = async (data: LoginInput): Promise<{ token: string }> => {
  const user = await findUserByEmail(data.email);
  if (!user) throw new Error("Identifiants invalides");

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error("Identifiants invalides");

  const signOptions: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  const token = jwt.sign(
    { userId: user.id as string, email: user.email },
    env.JWT_SECRET,
    signOptions
  );
  return { token };
};

export const getMe = async (userId: string): Promise<{ id: string; email: string; createdAt: Date }> => {
  const user = await findUserById(userId);
  if (!user) throw new Error("Utilisateur introuvable");

  return { 
    id: user.id as string, 
    email: user.email, 
    createdAt: user.createdAt as Date 
  };
};