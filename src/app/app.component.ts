import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import './training';
import { Color } from '../enums/Сolor';
import { Message } from '../enums/Message';
import { IMessage } from '../interfaces/IMessage';
import { Collection } from './collection';
import { offers } from '../data/offers';
import { popularDirections } from '../data/popularDirections';
import { blogPosts } from '../data/blogPosts';
import { IOffer } from '../interfaces/IOffer';
import { IPopularDirection } from '../interfaces/IPopularDirection';
import { IBlogPost } from '../interfaces/IBlogPost';
import { LocalStorageService } from '../local-storage.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'РУМТИБЕТ';
  offers: IOffer[] = offers;
  cards: IPopularDirection[] = popularDirections;
  blogPosts: IBlogPost[] = blogPosts;
  selectedLocation: string = '';
  selectedDate: string = '';
  selectedPeopleCount: string = '';
  currentDateTime: string = '';
  counter: number = 0;
  isClockVisible: boolean = true;
  liveInputValue: string = '';
  isLoading: boolean = true;
  numberCollection: Collection<number> = new Collection<number>([1, 2, 3, 4, 5]);
  carCollection: Collection<string> = new Collection<string>(['BMW', 'Audi', 'Toyota']);
  Message: typeof Message = Message;
  messageService = inject(MessageService);

  private localStorageService = inject(LocalStorageService);

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();

    this.numberCollection.removeItem(2);
    this.carCollection.replaceItem(1, 'Mercedes');

    this.updateCurrentDateTime();

    setInterval(() => this.updateCurrentDateTime(), 1000);

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  onSearch(): void {
    alert(
      `Локация: ${this.selectedLocation || '—'}, ` +
        `Дата: ${this.selectedDate || '—'}, ` +
        `Участники: ${this.selectedPeopleCount || '—'}`
    );
  }

  increaseCounter(): void {
    this.counter += 1;
  }

  decreaseCounter(): void {
    if (this.counter === 0) return;
    this.counter -= 1;
  }

  toggleHeaderWidget(): void {
    this.isClockVisible = !this.isClockVisible;
  }

  isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  get messages(): IMessage[] {
    return this.messageService.messages;
  }

  showWarnMsg(text: string): void {
    this.messageService.addMessage(Message.WARN, text);
  }

  showInfoMsg(text: string): void {
    this.messageService.addMessage(Message.INFO, text);
  }

  showErrorMsg(text: string): void {
    this.messageService.addMessage(Message.ERROR, text);
  }

  showSuccessMsg(text: string): void {
    this.messageService.addMessage(Message.SUCCESS, text);
  }

  closeMsg(message: IMessage): void {
    this.messageService.closeMessage(message);
  }

  private updateCurrentDateTime(): void {
    this.currentDateTime = new Date().toLocaleString('ru-RU').replace(',', '');
  }

  private saveLastVisitDate(): void {
    this.localStorageService.setValue('lastVisitDate', new Date().toString());
  }

  private saveVisitCount(): void {
    const raw: unknown | null = this.localStorageService.getValue('visitCount');

    const count: number =
      typeof raw === 'number'
        ? raw
        : typeof raw === 'string'
          ? Number(raw) || 0
          : 0;

    this.localStorageService.setValue('visitCount', count + 1);
  }

}