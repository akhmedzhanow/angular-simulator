import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Сolor';
import { Collection } from './collection';
import { offers } from '../data/offers';
import { IOffer } from '../interfaces/IOffer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'РУМТИБЕТ';
  offers: IOffer[] = offers;
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

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
    this.numberCollection.removeItem(2);
    this.carCollection.replaceItem(1, 'Mercedes');
    this.currentTime();

    setInterval(() => {
      this.currentTime();
    }, 1000);

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
    if (this.counter === 0) {
      return;
    }

    this.counter -= 1;
  }

  toggleHeaderWidget(): void {
    this.isClockVisible = !this.isClockVisible;
  }

  isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  private currentTime(): void {
    this.currentDateTime = new Date().toLocaleString('ru-RU').replace(',', '');
  }

  private saveLastVisitDate(): void {
    localStorage.setItem('lastVisitDate', new Date().toString());
  }

  private saveVisitCount(): void {
    const count: number = Number(localStorage.getItem('visitCount')) || 0;
    localStorage.setItem('visitCount', String(count + 1));
  }
  
}