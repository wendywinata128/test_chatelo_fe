import { useEffect } from "react";
import HomeChatContainer from "../components/home/chat-container";
import HomeChatRoom from "../components/home/chat-room";
import { useUserStore } from "../store/user";
import useChatRoomStore from "../store/chat-room";
import { VscLoading } from "react-icons/vsc";

export default function Home() {
  const userStore = useUserStore();
  const chatRoomStore = useChatRoomStore();

  useEffect(() => {
    userStore.fetchUserAccountData();
  }, [userStore.userData?._id]);

  useEffect(() => {
    chatRoomStore.fetchChatRoomData();

    return () => {
      Object.values(chatRoomStore.subscriptionEntity).forEach((subs) => {
        subs.unsubscribe();
      });
    };
  }, [Object.keys(chatRoomStore.chatRoomData ?? {}).length]);

  return userStore.isLoggedIn ? (
    <div className="flex h-full bg-white shadow rounded-lg overflow-hidden">
      <HomeChatRoom />
      <HomeChatContainer />
    </div>
  ) : (
    <div className="absolute flex flex-col gap-2 items-center justify-center top-0 left-0 right-0 bottom-0">
      <VscLoading className="animate-spin text-2xl" />
      <p>Getting User Data...</p>
    </div>
  );
}
