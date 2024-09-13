import { ChatRoom } from "../../entity/chat-room";
import { getDateMenuLeft } from "../../utils/global-function";

export default function HomeChatRoomItem({ chatRoom, onClick }: { chatRoom: ChatRoom, onClick: (chatRoom: ChatRoom) => void }) {

  const lastMessage = chatRoom?.messages?.length > 0 && chatRoom?.messages[chatRoom.messages.length - 1];

  return (
    <div className="px-4 border-b py-4 flex gap-3 items-center cursor-pointer hover:bg-gray-100" onClick={() => onClick(chatRoom)}>
      <div
        className="w-10 h-10 rounded-full"
        style={{ background: chatRoom.color }}
      ></div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center gap-2">
          <p className="mb-0.5 font-medium flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {chatRoom.name}
          </p>
          {/* <div className="dot w-2 h-2 rounded-full bg-green-300"></div> */}
        </div>
        <div className="flex justify-between text-sm text-gray-500 gap-2">
          <p className="">{lastMessage && lastMessage.message}</p>
          <p className="">{lastMessage && getDateMenuLeft(lastMessage.created_at)}</p>
        </div>
      </div>
    </div>
  );
}
