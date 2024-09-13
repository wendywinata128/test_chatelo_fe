import { BsArrowLeft, BsChat, BsPeople } from "react-icons/bs";
import TextField from "../text-field";
import useChatRoomStore from "../../store/chat-room";
import MessageItem from "./message-item";
import { useEffect, useRef, useState } from "react";
import ModalListUsers from "../modal-list-users/modal-list-user";

export default function HomeChatContainer() {
  const chatRoomStore = useChatRoomStore();
  const chatRoom = chatRoomStore.getSelectedChatRoom();
  const subs = useChatRoomStore().getSelectedSubscription();
  const refContainer = useRef<HTMLDivElement | null>(null);

  const [dialogListUser, setDialogListUser] = useState(false);

  const sendMessage = (value: string) => {
    subs?.perform("send_message", { message: value });
  };

  useEffect(() => {
    if (refContainer.current) {
      const el = refContainer.current;

      el.scrollTop = el.scrollHeight;
    }
  }, [chatRoom?.messages.length]);

  return !chatRoom ? (
    <div className="flex items-center justify-center flex-1 italic font-semibold text-center">
      Click one of your chat room on the left side to show the messages
    </div>
  ) : (
    <div className="flex-1 flex flex-col">
      <ModalListUsers
        users={[...chatRoom.members]}
        show={dialogListUser}
        onExit={() => setDialogListUser(false)}
      />
      <div
        className=" rounded-full p-3 cursor-pointer absolute right-4 bottom-4 z-40 bg-black text-white text-xl md:hidden"
        onClick={() => chatRoomStore.selectChatRoom(null)}
      >
        <BsArrowLeft />
      </div>
      <div className="flex items-center h-16 px-6 border-b shrink-0">
        <div
          className="w-10 h-10 rounded-full mr-3"
          style={{
            backgroundColor: chatRoom.color,
          }}
        ></div>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <p className="font-semibold">{chatRoom?.name}</p>
            <p className="font-semibold text-xs text-gray-600">
              {chatRoom.code}
            </p>
          </div>
          <p className="text-sm text-gray-600">
            {chatRoom.members.length} peoples in this group
          </p>
        </div>
        <div
          className=" text-black rounded-full p-2 cursor-pointer"
          onClick={() => setDialogListUser(true)}
        >
          <BsPeople className="text-lg" />
        </div>
      </div>

      <div
        className="flex-1 p-8 flex flex-col gap-6 overflow-auto scroll-smooth"
        ref={refContainer}
      >
        {chatRoom.messages.map((message) => {
          return <MessageItem key={message._id} message={message} />;
        })}
      </div>

      <div className="p-4 bg-gray-50 border-t">
        <TextField
          icon={<BsChat />}
          className="rounded-full"
          placeholder="Type a message"
          onEnter={sendMessage}
        />
      </div>
    </div>
  );
}
