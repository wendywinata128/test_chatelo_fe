import { create } from "zustand";
import { User } from "../entity/user";
import { fetchUserData } from "../api/methods/account";

interface UserStoreI {
  userData: User | null;
  isLoggedIn: boolean;
  fetchUserAccountData: () => void;
}

export const useUserStore = create<UserStoreI>((set) => {
  return {
    userData: null,
    isLoggedIn: localStorage.getItem("chat-id") ? true : false,
    fetchUserAccountData: async () => {
      const result = await fetchUserData();

      set((state) => {
        return {
          ...state,
          userData: result?.data,
          isLoggedIn: result ? true : false,
        };
      });
    },
  };
});
