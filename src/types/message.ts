export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: number;
  readBy?: string[];
};
