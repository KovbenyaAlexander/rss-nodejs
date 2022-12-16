import { UserType } from "./types";
import { v4 as uuidv4, validate as validateId } from "uuid";
import { getState, setState } from "./utils";

class UserController {
  async addUser(user: UserType) {
    const state = await getState();
    if (state) {
      const newUser = {
        id: uuidv4(),
        ...user,
      };
      state.push(newUser);
      setState(state);
    }

    return { status: 201, msg: "user created" };
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
    const user = state?.find((user: UserType) => user.id === id);
    if (user) {
      return { status: 200, msg: JSON.stringify(user, null, 2) };
    }
    return { status: 404, msg: "user not found" };
  }
}

export default new UserController();
