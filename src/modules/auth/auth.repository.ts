import { User } from "../../database/models/auth";

export const findUserByEmail = async (email: string) => {
  return User.findOne({ where: { email } });
};

export const createUser = async (email: string, password: string) => {
  return User.create({ email, password });
};

export const findUserById = async (id: string) => {
  return User.findOne({ 
    where: { id },
    attributes: ["id", "email", "createdAt"] // on n'expose jamais le password
  });
};