import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { Collection } from './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {

  companyName: string = 'РУМТИБЕТ';

  numberCollection: Collection<number> = new Collection<number>([1, 2, 3, 4, 5]);
  carCollection: Collection<string> = new Collection<string>(['BMW', 'Audi', 'Toyota']);

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
    this.numberCollection.removeItem(2);
    this.carCollection.replaceItem(1, 'Mercedes');
  }

  isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  saveLastVisitDate(): void {
    const currentDate: string = new Date().toString();
    localStorage.setItem('lastVisitDate', currentDate);
  }

  saveVisitCount(): void {
    const count: number = Number(localStorage.getItem('visitCount')) || 0;
    localStorage.setItem('visitCount', String(count + 1));
  }

}

