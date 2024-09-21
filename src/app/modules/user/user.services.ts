import config from "../../config";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (password: string, payload: TUser) => {
  const userData: Partial<TUser> = {
    ...payload,
    password: password || (config.default_password as string),
  };

  const newUser = await User.create(userData);
  return newUser;
};
const signInUser = async (payload: any) => {
  const result = await User.create(payload);
  return result;
};
export const userService = { createUserIntoDB, signInUser };
