import { messageType } from "./types";
import UserController from "./users/userController";
import { isUserValid } from "./users/userService";

const router = async (message: any, state: any) => {
  const { method, url, body } = message;
  const arr = url?.split("/").filter((s: any) => s !== "");
  const [api, users, id, ...rest] = [...(arr || [])];

  if (`${api}/${users}` !== "api/users") {
    return { status: 404, msg: "error 404. resource not found", state };
  }

  switch (method) {
    case "POST": {
      if (!body || !isUserValid(body)) {
        return { status: 400, msg: "Invalid user data", state };
      } else if (id || rest.length) {
        return { status: 404, msg: "error 404. resource not found", state };
      } else {
        return await UserController.addUser(body, state);
      }
    }

    case "GET": {
      if (id) {
        return await UserController.getUserById(id, state);
      } else {
        return await UserController.getAllusers(state);
      }
    }

    case "PUT": {
      if (!body) return { status: 400, msg: "Invalid user data", state };
      return await UserController.updateUser(id, body, state);
    }

    case "DELETE": {
      return await UserController.removeUser(id, state);
    }
  }
  return { status: 500, msg: "err", state };
};

export default router;
