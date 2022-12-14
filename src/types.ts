export type UserType = {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type messageType = {
  body?: UserType | undefined;
  url: string | undefined;
  method: string | undefined;
};
