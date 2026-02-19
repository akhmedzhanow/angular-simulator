import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import './training';
import { Color } from '../enums/Сolor';
import { Collection } from './collection';
import { offers } from '../data/offers';
import { IOffer } from '../interfaces/IOffer';
import { FormsModule } from '@angular/forms';
import { Message } from '../enums/Message';
import { DirectionKind } from '../enums/DirectionKind';
import { IPopularDirection } from '../interfaces/IPopularDirection';
import { popularDirections } from '../data/popularDirections';
import { IBlogPost } from '../interfaces/IBlogPost';
import { blogPosts } from '../data/blogPosts';
import { LocalStorageService } from '../local-storage.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  companyName: string = 'РУМТИБЕТ';
  offers: IOffer[] = offers;

  selectedLocation: string = '';
  selectedDate: string = '';
  selectedPeopleCount: string = '';

  currentDateTime!: string;
  counter: number = 0;
  isClockVisible: boolean = true;

  liveInputValue: string = '';
  isLoading: boolean = true;

  numberCollection: Collection<number> = new Collection<number>([1, 2, 3, 4, 5]);
  carCollection: Collection<string> = new Collection<string>(['BMW', 'Audi', 'Toyota']);

  popularDirectionsError: string | null = null;
  cards: IPopularDirection[] = popularDirections;
  blogPosts: IBlogPost[] = blogPosts;

  readonly Message = Message;
  readonly DirectionKind = DirectionKind;

  private clockIntervalId!: ReturnType<typeof setInterval>;
  private loadingTimerId!: ReturnType<typeof setTimeout>;

  constructor(public readonly notificationService: NotificationService, private readonly storage: LocalStorageService) {
    this.saveLastVisitDate();
    this.saveVisitCount();

    this.numberCollection.removeItem(2);
    this.carCollection.replaceItem(1, 'Mercedes');

    this.updateCurrentDateTime();

    this.clockIntervalId = setInterval(() => {
      this.updateCurrentDateTime();
    }, 1000);

    this.loadingTimerId = setTimeout(() => {
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

  showSuccessMsg(): void {
    this.notificationService.addMessage(Message.SUCCESS, 'Направления получены');
  }

  showInfoMsg(): void {
    this.notificationService.addMessage(Message.INFO, 'Стоимость отправлена на почту');
  }

  showWarnMsg(): void {
    this.notificationService.addMessage(Message.WARN, 'Программа недоступна');
  }

  showErrorMsg(): void {
    this.notificationService.addMessage(Message.ERROR, 'Материалы недоступны');
  }

  private updateCurrentDateTime(): void {
    this.currentDateTime = new Date().toLocaleString('ru-RU').replace(',', '');
  }

  private saveLastVisitDate(): void {
    this.storage.setValue<string>('lastVisitDate', new Date().toString());
  }

  private saveVisitCount(): void {
    const count = this.storage.getValue<number>('visitCount') ?? 0;
    this.storage.setValue<number>('visitCount', count + 1);
  }
}