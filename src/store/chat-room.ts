import { Message } from './../entity/message';
import { create } from "zustand";
import { ChatRoom } from "../entity/chat-room";
import { Subscription } from "@rails/actioncable";
import { fetchChatRoomData, processChatLogic } from "../api/methods/chat-process";

interface ChatRoomStoreI {
  chatRoomData: {
    [key: string]: ChatRoom;
  } | null;
  fetchChatRoomData: () => void;
  
  selectedChatRoom: string | null;
  selectChatRoom: (room: ChatRoom | null) => void;
  updateChatRoomData: (message: Message, chatRoomId: string) => void;
  getSelectedChatRoom: () => ChatRoom | null;
  
  subscriptionEntity: {
    [key: string]: Subscription;
  },
  getSelectedSubscription: () => Subscription | null;
}

const useChatRoomStore = create<ChatRoomStoreI>((set, get) => {
  return {
    chatRoomData: null,
    subscriptionEntity: {},
    fetchChatRoomData: async () => {
      const data = await fetchChatRoomData();
      const mappedChatRoom: any = {};

      if(data.length === 0) return;

      data.forEach((chat) => {
        mappedChatRoom[chat._id] = chat;
      });

      let subs = processChatLogic(mappedChatRoom);

      set((state) => {
        return { ...state, chatRoomData: mappedChatRoom, subscriptionEntity: subs };
      });
    },
    updateChatRoomData: (message: Message, chatRoomId: string) => {
      set((state) => {
        
        if(state.chatRoomData == null || state.chatRoomData[chatRoomId] == null) return state;
        
        
        const chatRoom: ChatRoom = state.chatRoomData[chatRoomId]

        const exists = chatRoom.messages.some(m => m._id === message._id)

        if(!exists){
          chatRoom.messages.push(message);

          state.chatRoomData[chatRoomId] = chatRoom;
        }

        return {...state};
      })
    },

    selectedChatRoom: null,
    selectChatRoom: (room: ChatRoom | null) => {
      set((state) => {
        if(!room){
          return {...state, selectedChatRoom: null}
        }
        return { ...state, selectedChatRoom: room._id };
      });
    },
    getSelectedChatRoom: () => {
      return get().selectedChatRoom ? get().chatRoomData![get().selectedChatRoom!]  : null ; 
    },

    getSelectedSubscription: () => {
      return get().selectedChatRoom ? get().subscriptionEntity[get().selectedChatRoom!]  : null ; 
    },
  };
});

export default useChatRoomStore;
