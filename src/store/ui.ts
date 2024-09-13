import { create } from "zustand";

interface UIStoreI {
  toast: boolean;
  message: string;
  type: "success" | "failed";
  showToast: (message: string, type: "success" | "failed") => void;
}

let timeout: any = null;

export const useUIStore = create<UIStoreI>((set) => {
  return {
    toast: false,
    message: "Messages",
    type: "success",
    showToast: (message, type) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      set((state) => {
        return {
          ...state,
          toast: true,
          message,
          type,
        };
      });

      timeout = setTimeout(() => {
        set((state) => {
          return {
            ...state,
            message: "Messages",
            toast: false,
          };
        });
      }, 3000);
    },
  };
});
