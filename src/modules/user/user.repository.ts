/*import { User } from "../../database/models/auth";

export const getAllUsers = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const { rows, count } = await User.findAndCountAll({
    attributes: ["id", "email", "createdAt"],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });
  return { users: rows, total: count, page, limit };
};

export const getUserById = async (id: number) => {
  return User.findOne({
    where: { id },
    attributes: ["id", "email", "createdAt"],
  });
};
*/