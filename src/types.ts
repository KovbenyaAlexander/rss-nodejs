import userController from "./users/userController";

export type UserType = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type StateType = UserType[];

export type messageType = {
  type: string;
  body?: UserType | undefined;
  url: string | undefined;
  method: string | undefined;
};
