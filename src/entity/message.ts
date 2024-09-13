import { User } from "./user";

export interface Message {
  _id: string;
  message: string;
  author_id: string;
  chat_room_id: string;
  author: User;
  created_at: string;
  updated_at: string;
  type: string;
}
