import { Message } from "../../entity/message";
import { useUserStore } from "../../store/user";

export default function MessageItem({ message }: { message: Message }) {
  const userData = useUserStore((state) => state.userData);

  if (message.type === "information") {
    return (
      <div className="mx-auto text-sm text-gray-500 italic bg-gray-200 rounded px-4 py-2">
        {message.message}
      </div>
    );
  }

  if (message.author_id === userData?._id) {
    // this is message from current user.

    return (
      <div className="flex flex-row-reverse items-start gap-3">
        <div
          className="w-8 h-8 rounded-full border border-gray-300"
          style={{ background: message.author.color }}
        ></div>
        <div className="bg-accent text-white max-w-[60%] w-fit py-3 px-5 rounded-tl-xl rounded-b-xl">
          <p className="text-sm font-semibold mb-1">{message.author.name}</p>
          <p className="text-sm text-gray-100">{message.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-full border border-gray-300"
          style={{ background: message.author.color }}
        ></div>
        <div className="bg-gray-500 text-white max-w-[60%] w-fit py-3 px-5 rounded-tr-xl rounded-b-xl">
          <p className="text-sm font-semibold mb-1">{message.author.name}</p>
          <p className="text-sm text-gray-100">{message.message}</p>
        </div>
      </div>
  );
}
