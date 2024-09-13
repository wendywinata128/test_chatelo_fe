import { Subscription } from "@rails/actioncable";
import { ChatRoom } from "../../entity/chat-room";
import useChatRoomStore from "../../store/chat-room";
import axiosInstance from "../libraries/axios";
import { BaseResponse } from "../../entity/base-response";
import { consumer } from "../libraries/cable";
import { handlingError } from "../../utils/global-function";

export async function fetchChatRoomData() {
  try {
    const {
      data: { data },
    } = await axiosInstance.get<BaseResponse<ChatRoom[]>>("/chat_room");

    return data;
  } catch(e) {
    handlingError(e);
    return [];
  }
}

export function processChatLogic(
  chatRoomData: { [key: string]: ChatRoom } | null
): {
  [key: string]: Subscription;
} {
  let subsData: {
    [key: string]: Subscription;
  } = {};

  if (chatRoomData == null) return subsData;

  Object.entries(chatRoomData).forEach((chat) => {
    const room = chat[1];

    const subs = consumer.subscriptions.create(
      {
        channel: "ChatRoomChannel",
        room: room._id,
      },
      {
        received: (data: any) => {
          const dataParsed = JSON.parse(data);
          const chatRoomStore = useChatRoomStore.getState();

          chatRoomStore.updateChatRoomData(dataParsed, room._id);
        },
      }
    );

    subsData[room._id] = subs;
  });

  return subsData;
}
