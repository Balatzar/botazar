export interface Message {
  type: string;
  channel: string;
  channelName: string;
  user: string;
  userName: string;
  text: string;
  ts: string;
  team: string;
};

export interface SendMessage {
  (msg: string): void;
};
