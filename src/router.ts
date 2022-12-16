import { messageType } from "./types";
import UserController from "./userController";
import { isUserValid } from "./userService";

const router = async (message: messageType) => {
  const { method, url, body } = message;
  const arr = url?.split("/").filter((s) => s !== "");
  const [api, users, id, ...rest] = [...(arr || [])];

  if (`${api}/${users}` !== "api/users") {
    return { status: 404, msg: "error 404. resource not found" };
  }

  switch (method) {
    case "POST": {
      if (!body || !isUserValid(body)) {
        return { status: 400, msg: "Invalid user data" };
      } else if (id || rest.length) {
        return { status: 404, msg: "error 404. resource not found" };
      } else {
        return await UserController.addUser(body);
      }
    }

    case "GET": {
      if (id) {
        return await UserController.getUserById(id);
      } else {
        return await UserController.getAllusers();
      }
    }

    case "PUT": {
      break;
    }

    case "DELETE": {
      return await UserController.removeUser(id);
    }
  }

  return { status: 500, msg: "err" };
};

export default router;
