import { BsChat, BsPlus, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import TextField from "../text-field";
import useChatRoomStore from "../../store/chat-room";
import HomeChatRoomItem from "./chat-room-item";
import { ChatRoom } from "../../entity/chat-room";
import { useCallback, useState } from "react";
import { CreateRoomModal } from "../create-room/create-room-modal";
import { createChatRoom, joinChatRoom } from "../../api/methods/chat-room";
import CustomButton from "../custom-button";
import { JoinRoomModal } from "../join-room/join-room-modal";

export default function HomeChatRoom() {
  const { chatRoomData, selectChatRoom } = useChatRoomStore();
  const [dialogAddChatRoom, setDialogAddChatRoom] = useState(false);
  const [dialogJoinChatRoom, setDialogJoinChatRoom] = useState(false);

  const onClick = useCallback(
    (chatRoom: ChatRoom) => {
      selectChatRoom(chatRoom);
    },
    [selectChatRoom]
  );

  const onCreateRoomSubmitted = async (formRef: HTMLFormElement) => {
    const data = Object.fromEntries(new FormData(formRef));

    const result = await createChatRoom(data);

    if (result) {
      setDialogAddChatRoom(false);
      formRef.reset()
    }
  };

  const onJoinRoomSubmitted = async (formRef: HTMLFormElement) => {
    const data = Object.fromEntries(new FormData(formRef));

    const result = await joinChatRoom(data.code.toString(), data.password.toString());

    if (result) {
      setDialogJoinChatRoom(false);
      formRef.reset()
    }
  };

  return (
    <div className="w-full h-full border-r flex flex-col">
      <CreateRoomModal
        show={dialogAddChatRoom}
        onCreateRoom={onCreateRoomSubmitted}
        onExit={() => setDialogAddChatRoom(false)}
      />
      <JoinRoomModal
        show={dialogJoinChatRoom}
        onJoinRoom={onJoinRoomSubmitted}
        onExit={() => setDialogJoinChatRoom(false)}
      />

      <div className="flex justify-between items-center px-4 h-16 bg-gray-700 text-white">
        <h2 className="font-semibold">Chat Room</h2>
        <div
          className="border rounded-full text-xl cursor-pointer"
          onClick={() => setDialogAddChatRoom(true)}
        >
          <BsPlus className="" />
        </div>
      </div>

      <div className="p-4">
        <CustomButton
          title="Join Room"
          className="w-full"
          onClick={() => setDialogJoinChatRoom(true)}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex items-center gap-2 px-4 text-sm text-gray-500">
          <BsChat />
          <h3 className="font-semibold">Chat Rooms</h3>
        </div>
        {Object.entries(chatRoomData ?? {}).map((obj) => (
          <HomeChatRoomItem
            chatRoom={obj[1]}
            onClick={onClick}
            key={obj[1]._id}
          />
        ))}
      </div>
    </div>
  );
}
