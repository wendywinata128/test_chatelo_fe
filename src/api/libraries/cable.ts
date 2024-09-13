import { createConsumer } from "@rails/actioncable";

const getToken = () => {
  return encodeURIComponent(localStorage.getItem("chat-id") ?? "");
};

export let consumer = createConsumer(
  `ws://localhost:3000/cable?token=${getToken()}`
);

export const initializeConsumer = () => {
  consumer = createConsumer(`ws://localhost:3000/cable?token=${getToken()}`);
};
