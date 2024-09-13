import { FaHashtag } from "react-icons/fa6";
import { BaseModal } from "../base-modal";
import TextField from "../text-field";
import CustomButton from "../custom-button";
import ColorPicker from "../color-picker";
import { FormEventHandler, useRef } from "react";

export function CreateRoomModal({
  show = false,
  onCreateRoom,
  onExit,
}: {
  show: boolean;
  onCreateRoom: (formRef: HTMLFormElement) => void;
  onExit: () => void
}) {

  const formRef = useRef<HTMLFormElement>(null);

  const onFormSubmitted: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if(formRef.current){
      onCreateRoom(formRef.current);
    }
  }
  return (
    <BaseModal show={show} onExit={onExit}>
      <div className="w-[500px] max-h-[500px] max-w-full bg-white rounded flex flex-col">
        <h4 className="text-center p-4 border-b border-b-gray-400 mb-4 font-semibold">
          Create Chat Room
        </h4>

        <form className="flex flex-col gap-4 px-4 mb-8 flex-1 overflow-auto" ref={formRef} onSubmit={onFormSubmitted}>
          <TextField
            name="name"
            title="Room Name"
            className="rounded"
            placeholder="Enter Room Name"
            required
          />
          <TextField
            name="password"
            title="Room Password"
            className="rounded"
            placeholder="Enter Room Password"
            helper="Another users will have to enter the correct password to enter to your room"
            type="password"
            required
          />
          <TextField
            name="code"
            title="Room Code"
            className="rounded uppercase"
            placeholder="Enter Room Code"
            helper="User will use this code to join your room"
            icon={<FaHashtag className="text-gray-500 text-sm"/>}
            required
          />
          <ColorPicker name="color" />
          <div className="flex justify-center mt-2">
            <CustomButton title="Create a Room" type="submit"/>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
