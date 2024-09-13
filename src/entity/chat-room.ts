import { Message } from "./message";
import { User } from "./user";

export interface ChatRoom {
  _id: string;
  name: string;
  password: string;
  color: string;
  code: string;
  author: User;
  updated_at: string;
  created_as: string;
  messages: Message[];
  members: User[];
}
