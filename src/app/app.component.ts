import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';
import { users, type IUser } from './training';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  companyName = 'РУМТИБЕТ';
  userCollection = new Collection<IUser>(users);
  colorCollection = new Collection<Color>(Object.values(Color));

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
  }

  saveLastVisit(): void {
    localStorage.setItem('lastVisitDate', new Date().toISOString());
  }

  saveVisitCount(): void {
    const previousCount = Number(localStorage.getItem('visitCount')) || 0;
    localStorage.setItem('visitCount', String(previousCount + 1));
  }

  isPrimaryColor(color: Color): boolean {
    return color === Color.Red || color === Color.Green || color === Color.Blue;
  }
}
