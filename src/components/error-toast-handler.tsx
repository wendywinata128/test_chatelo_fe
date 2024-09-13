import { createPortal } from "react-dom";
import { useUIStore } from "../store/ui";

export function ErrorToastHandler() {
  const uiStore = useUIStore();

  return createPortal(
    <div
      className={`modal-container fixed right-4 bottom-4 z-50 flex items-center justify-center transition duration-500 ${
        uiStore.toast
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`px-4 py-2 rounded text-white ${
          uiStore.type === "success"
            ? "bg-green-500 shadow-green-500"
            : "bg-red-500 shadow-red-500"
        }`}
      >
        {uiStore.message}
      </div>
    </div>,
    document.getElementById("modal")!
  );
}
