import { StatusMessageType } from '../enums/StatusMessageType';

export interface IStatusMessage {
  id: number;
  text: string;
  type: StatusMessageType;
}