import { UserType } from "../types";
import { v4 as uuidv4, validate as validateId } from "uuid";
import { getState, setState } from "../utils";

class UserController {
  async addUser(user: UserType, state: any) {
    const newUser = {
      id: uuidv4(),
      ...user,
    };
    state.push(newUser);

    return { status: 201, msg: JSON.stringify(newUser), state };
  }

  async getAllusers(state: any) {
    return { status: 200, msg: JSON.stringify(state, null, 2), state };
  }

  async getUserById(id: string, state: any) {
    if (!validateId(id)) {
      return { status: 400, msg: "userId is invalid", state };
    }

    const user = state.find((user: UserType) => user.id === id);
    if (user) {
      return { status: 200, msg: JSON.stringify(user, null, 2), state };
    }
    return { status: 404, msg: "user not found", state };
  }

  async removeUser(id: string, state: any) {
    if (!id) {
      return { status: 400, msg: "ID required", state };
    }

    if (!validateId(id)) {
      return { status: 400, msg: "userId is invalid", state };
    }

    const user = state?.find((user: UserType) => user.id === id);
    if (!user) {
      return { status: 404, msg: "user not found", state };
    }
    const newState = state?.filter((user: UserType) => user.id !== id);

    return { status: 204, msg: "User deleted", state: newState };
  }

  async updateUser(id: string, update: UserType, state: any) {
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

    const user = state?.find((user: UserType) => user.id === id);
    if (!user) return { status: 404, msg: "user not found", state };

    const newState = state.map((user: UserType) => {
      if (user.id === id) {
        return {
          ...user,
          ...update,
        };
      } else {
        return user;
      }
    });

    const newUser = newState.find((user: UserType) => user.id === id);

    return { status: 200, msg: JSON.stringify(newUser, null, 2), state: newState };
  }
}

export default new UserController();
