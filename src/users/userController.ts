import { UserType } from "../types";
import { v4 as uuidv4, validate as validateId } from "uuid";
import { getState, setState } from "../utils";

class UserController {
  async addUser(user: UserType) {
    const state = await getState();

    const newUser = {
      id: uuidv4(),
      ...user,
    };
    state.push(newUser);
    setState(state);

    return { status: 201, msg: JSON.stringify(newUser) };
  }

  async getAllusers() {
    const state = await getState();
    return { status: 200, msg: JSON.stringify(state, null, 2) };
  }

  async getUserById(id: string) {
    if (!validateId(id)) {
      return { status: 400, msg: "userId is invalid" };
    }

    const state = await getState();
    const user = state.find((user: UserType) => user.id === id);
    if (user) {
      return { status: 200, msg: JSON.stringify(user, null, 2) };
    }
    return { status: 404, msg: "user not found" };
  }

  async removeUser(id: string) {
    if (!id) {
      return { status: 400, msg: "ID required" };
    }

    if (!validateId(id)) {
      return { status: 400, msg: "userId is invalid" };
    }

    const state = await getState();
    const user = state?.find((user: UserType) => user.id === id);
    if (!user) {
      return { status: 404, msg: "user not found" };
    }
    const newState = state?.filter((user: UserType) => user.id !== id);
    setState(newState);

    return { status: 204, msg: "User deleted" };
  }

  async updateUser(id: string, update: UserType) {
    if (!id) return { status: 400, msg: "ID required" };
    if (!validateId(id)) return { status: 400, msg: "userId is invalid" };

    if (update.age && typeof update.age !== "number") {
      return { status: 400, msg: "age is not a number" };
    }
    if (update.username && typeof update.username !== "string") {
      return { status: 400, msg: "username is not a string" };
    }

    if (update.hasOwnProperty("hobbies")) {
      let isHobbiesValid = false;
      if (Array.isArray(update.hobbies)) {
        isHobbiesValid = update.hobbies.every((hobby) => typeof hobby === "string");
      }

      if (!isHobbiesValid || !Array.isArray(update.hobbies)) {
        return { status: 400, msg: "hobbies is not an array of str" };
      }
    }

    const state = await getState();

    const user = state?.find((user: UserType) => user.id === id);
    if (!user) return { status: 404, msg: "user not found" };

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

    await setState(newState);
    return { status: 200, msg: JSON.stringify(newUser, null, 2) };
  }
}

export default new UserController();
