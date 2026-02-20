import { Injectable } from '@angular/core';
import { StatusMessageType } from './enums/StatusMessageType';
import { IStatusMessage } from './interfaces/IStatusMessage';

type TimerItem = {
  id: number;
  timerId: ReturnType<typeof setTimeout>;
};

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private messagesList: IStatusMessage[] = [];
  private timers: TimerItem[] = [];
  private lastId = 0;

  get messages(): IStatusMessage[] {
    return this.messagesList;
  }

  addMessage(type: StatusMessageType, text: string): void {
    const id = ++this.lastId;

    this.messagesList.unshift({ id, type, text });

    const timerId = setTimeout(() => {
      this.closeMessage(id);
    }, 5000);

    this.timers.push({ id, timerId });
  }

  closeMessage(id: number): void {
    const timerIndex = this.timers.findIndex((t) => t.id === id);
    if (timerIndex !== -1) {
      clearTimeout(this.timers[timerIndex].timerId);
      this.timers.splice(timerIndex, 1);
    }

    const msgIndex = this.messagesList.findIndex((m) => m.id === id);
    if (msgIndex !== -1) {
      this.messagesList.splice(msgIndex, 1);
    }
  }

}