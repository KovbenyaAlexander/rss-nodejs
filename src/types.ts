export interface IUser {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface IMessage {
  type: string;
  state?: IUser[];
}

export interface IRequest {
  method: string;
  url: string;
  body: any;
  type?: string;
}
