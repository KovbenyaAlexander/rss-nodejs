import { UserType } from "./types.js";
import { v4 as uuidv4 } from "uuid";

const users: UserType[] = [];

class UserController {
  addUser(user: UserType) {
    const newUser = {
      id: uuidv4(),
      ...user,
    };

    users.push(newUser);

    console.log(users.length);
    return { status: 201, msg: "user created" };
  }
}

export default new UserController();
