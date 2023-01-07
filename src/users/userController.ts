import { IUser } from "../types";
import { v4 as uuidv4, validate as validateId } from "uuid";

class UserController {
  async addUser(user: IUser, state: IUser[]) {
    const newUser = {
      id: uuidv4(),
      ...user,
    };
    state.push(newUser);

    return { status: 201, msg: JSON.stringify(newUser), state };
  }

  async getAllusers(state: IUser[]) {
    return { status: 200, msg: JSON.stringify(state, null, 2), state };
  }

  async getUserById(id: string, state: IUser[]) {
    if (!validateId(id)) {
      return { status: 400, msg: "userId is invalid", state };
    }

    const user = state.find((user: IUser) => user.id === id);
    if (user) {
      return { status: 200, msg: JSON.stringify(user, null, 2), state };
    }
    return { status: 404, msg: "user not found", state };
  }

  async removeUser(id: string, state: IUser[]) {
    if (!id) {
      return { status: 400, msg: "ID required", state };
    }

    if (!validateId(id)) {
      return { status: 400, msg: "userId is invalid", state };
    }

    const user = state?.find((user: IUser) => user.id === id);
    if (!user) {
      return { status: 404, msg: "user not found", state };
    }
    const newState = state?.filter((user: IUser) => user.id !== id);

    return { status: 204, msg: "User deleted", state: newState };
  }

  async updateUser(id: string, update: IUser, state: IUser[]) {
    if (!id) return { status: 400, msg: "ID required", state };
    if (!validateId(id)) return { status: 400, msg: "userId is invalid", state };

    if (update.age && typeof update.age !== "number") {
      return { status: 400, msg: "age is not a number", state };
    }
    if (update.username && typeof update.username !== "string") {
      return { status: 400, msg: "username is not a string", state };
    }

    if (update.hasOwnProperty("hobbies")) {
      let isHobbiesValid = false;
      if (Array.isArray(update.hobbies)) {
        isHobbiesValid = update.hobbies.every((hobby) => typeof hobby === "string");
      }

      if (!isHobbiesValid || !Array.isArray(update.hobbies)) {
        return { status: 400, msg: "hobbies is not an array of str", state };
      }
    }

    if (!update.age || !update.hobbies || !update.username) {
      return { status: 400, msg: "user must have username, age and hobbies", state };
    }

    const user = state?.find((user: IUser) => user.id === id);
    if (!user) return { status: 404, msg: "user not found", state };

    const newState = state.map((user: IUser) => {
      if (user.id === id) {
        return {
          ...user,
          ...update,
        };
      } else {
        return user;
      }
    });

    const newUser = newState.find((user: IUser) => user.id === id);

    return { status: 200, msg: JSON.stringify(newUser, null, 2), state: newState };
  }
}

export default new UserController();
