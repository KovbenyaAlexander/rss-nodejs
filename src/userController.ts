import { UserType } from "./types";
import { v4 as uuidv4 } from "uuid";
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
}

export default new UserController();
