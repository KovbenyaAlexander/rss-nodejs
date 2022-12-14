import { messageType } from "./types";
import UserController from "./userController";
import { isUserValid } from "./userService";

const router = (message: messageType) => {
  const { method, url, body } = message;

  switch (method) {
    case "POST": {
      if (!body || !isUserValid(body)) {
        return { status: 400, msg: "Invalid user data" };
      } else {
        return UserController.addUser(body);
      }
    }
    case "PUT": {
      break;
    }
    case "GET": {
      break;
    }
    case "DELETE": {
      break;
    }
  }

  return { status: 500, msg: "err" };
};

export default router;
