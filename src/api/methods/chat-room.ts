import { BaseResponse } from "../../entity/base-response";
import useChatRoomStore from "../../store/chat-room";
import { handlingError } from "../../utils/global-function";
import axiosInstance from "../libraries/axios";

export async function createChatRoom(data: any): Promise<boolean> {
  try {
    const body = {
      room: {
        ...data,
        code: "#" + data.code.toString().toUpperCase().replaceAll("#", ""),
      },
    };

    const result = await axiosInstance.post<BaseResponse<any>>(
      "/chat_room",
      body
    );

    if (result.status === 200) {
      useChatRoomStore.getState().fetchChatRoomData();
    }
  } catch (e) {
    handlingError(e);
  }

  return true;
}

export async function joinChatRoom(
  code: string,
  password: string
): Promise<boolean> {
  try {
    const result = await axiosInstance.put<BaseResponse<any>>(
      `/chat_room/${code}/join`,
      {
        password: password.toString().toUpperCase().replaceAll("#", ""),
      }
    );

    if (result.status === 200) {
      useChatRoomStore.getState().fetchChatRoomData();
    }

    return true;
  } catch (e) {
    handlingError(e);
  }

  return false;
}
