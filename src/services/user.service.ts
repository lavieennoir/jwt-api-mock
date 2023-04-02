import { users } from "../mocks/users";

const getByEmail = (email: string) => {
  return (
    users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null
  );
};

const getById = (id: string) => {
  return users.find((u) => u.id === id) ?? null;
};

export const userService = {
  getByEmail,
  getById,
};
