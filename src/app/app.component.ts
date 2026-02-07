import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Сolor';
import { Collection } from './collection';
import { Offers } from '../interfaces/Offers';
import type { IOfferItem } from '../interfaces/Offer-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'РУМТИБЕТ';
  offers: IOfferItem[] = Offers;
  location: string = '';
  date: string = '';
  people: string = '';
  currenrDateName: string = '';
  clickCount: number = 0;
  showClock: boolean = true;
  liveText = '';
  isLoading: boolean = true;
  numberCollection: Collection<number> = new Collection<number>([1, 2, 3, 4, 5]);
  carCollection: Collection<string> = new Collection<string>(['BMW', 'Audi', 'Toyota']);
  private timerId: number | null = null;

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
    this.numberCollection.removeItem(2);
    this.carCollection.replaceItem(1, 'Mercedes');
  }

  ngOnInit(): void {
    window.setTimeout((): void => {
      this.isLoading = false;
    }, 2000);

    this.startClock();
  }

  ngOnDestroy(): void {
    this.stopClock();
  }

  onSearch(): void {
    console.log({
      location: this.location,
      date: this.date,
      people: this.people
    });
  }

  increase(): void {
    this.clickCount += 1;
  }

  decrease(): void {
    if (this.clickCount === 0) return;
    this.clickCount -= 1;
  }

  toggleHeaderWidget(): void {
    this.showClock = !this.showClock;
  }

  isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  private saveLastVisitDate(): void {
    const currentDate: string = new Date().toString();
    localStorage.setItem('lastVisitDate', currentDate);
  }

  private saveVisitCount(): void {
    const count: number = Number(localStorage.getItem('visitCount')) || 0;
    localStorage.setItem('visitCount', String(count + 1));
  }

  private startClock(): void {
    this.updateDateName();

    this.timerId = window.setInterval((): void => {
      this.updateDateName();
    }, 1000);
  }

  private stopClock(): void {
    if (this.timerId === null) return;
    window.clearInterval(this.timerId);
    this.timerId = null;
  }

  private updateDateName(): void {
    const now: Date = new Date();
    const dd: string = String(now.getDate()).padStart(2, '0');
    const mm: string = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy: string = String(now.getFullYear());
    const hh: string = String(now.getHours()).padStart(2, '0');
    const min: string = String(now.getMinutes()).padStart(2, '0');
    const ss: string = String(now.getSeconds()).padStart(2, '0');

    this.currenrDateName = `${dd}.${mm}.${yyyy} ${hh}:${min}:${ss}`;
  }
  
}