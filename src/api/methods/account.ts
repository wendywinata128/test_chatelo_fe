import { BaseResponse } from "../../entity/base-response";
import { User } from "../../entity/user";
import { useUserStore } from "../../store/user";
import { handlingError } from "../../utils/global-function";
import axiosInstance from "../libraries/axios";
import { initializeConsumer } from "../libraries/cable";

export async function createAccount(name: string, color: string) {
  try {
    const { data: result } = await axiosInstance.post<BaseResponse<User>>(
      "/user",
      {
        name,
        color,
      }
    );

    if (result.status === 200) {
      localStorage.setItem("chat-id", result.data.token);
      initializeConsumer();
      useUserStore.getState().fetchUserAccountData();
    }
  } catch(e) {
    handlingError(e);
  }
}

export async function fetchUserData() {
  try {
    const { data: result } = await axiosInstance.get<BaseResponse<User>>(
      "/user"
    );
    return result;
  } catch(e) {
    localStorage.removeItem("chat-id");
    handlingError(e);
    return null;
  }
}
