import { MouseEventHandler, ReactNode } from "react";
import { createPortal } from "react-dom";

export function BaseModal({
  children,
  show = false,
  onExit,
}: {
  children: ReactNode;
  show?: boolean;
  onExit?: () => void;
}) {
  const onClickOutside: MouseEventHandler = (e) => {
    if((e.target as HTMLDivElement).classList.contains("modal-container")){
      onExit && onExit()
    }
  };
  return createPortal(
    <div
      className={`modal-container p-4 fixed top-0 left-0 right-0 bottom-0 z-30 bg-black/60 flex items-center justify-center ${
        show ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClickOutside}
    >
      {children}
    </div>,
    document.getElementById("modal")!
  );
}
