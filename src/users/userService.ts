import { IUser } from "../types";

const isUserValid = (user: IUser) => {
  if (typeof user.username !== "string" || typeof user.age !== "number") {
    return false;
  }

  let isHobbiesValid = true;
  if (Array.isArray(user.hobbies)) {
    user.hobbies.forEach((hobby: string) => {
      if (typeof hobby !== "string") {
        isHobbiesValid = false;
      }
    });
  }

  if (!isHobbiesValid || !Array.isArray(user.hobbies)) {
    return false;
  }

  return true;
};

export { isUserValid };
