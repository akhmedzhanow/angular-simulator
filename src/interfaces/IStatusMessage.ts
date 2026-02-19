import { Message } from '../enums/Message';

export interface IStatusMessage {
  id: number;
  text: string;
  type: Message;
}