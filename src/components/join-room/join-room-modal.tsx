import { createPortal } from "react-dom";
import { BaseModal } from "../base-modal";
import TextField from "../text-field";
import CustomButton from "../custom-button";
import { FormEventHandler, useRef } from "react";
import { FaHashtag } from "react-icons/fa6";

export function JoinRoomModal({
  show = false,
  onJoinRoom,
  onExit,
}: {
  show: boolean;
  onJoinRoom: (formRef: HTMLFormElement) => void;
  onExit: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const onFormSubmitted: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (formRef.current) {
      onJoinRoom(formRef.current);
    }
  };

  return (
    <BaseModal show={show} onExit={onExit}>
      <form
        className="w-[500px] max-w-full bg-white rounded pb-6"
        onSubmit={onFormSubmitted}
        ref={formRef}
      >
        <h4 className="text-center p-4 border-b border-b-gray-400 mb-4 font-semibold">
          Join Room
        </h4>

        <div className="flex flex-col gap-4 px-4 mb-8">
          <TextField
            name="code"
            title="Room Code"
            className="rounded"
            placeholder="Enter Room ID"
            icon={<FaHashtag className="text-gray-500 text-sm" />}
            required
          />
          <TextField
            name="password"
            title="Room Password"
            className="rounded"
            placeholder="Enter Room Password"
            type="password"
            required
          />
        </div>

        <div className="flex justify-center">
          <CustomButton title="Search and Join Room" />
        </div>
      </form>
    </BaseModal>
  );
}
