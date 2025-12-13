import { Component, signal } from '@angular/core';
import { Home } from './Components/home/home';

@Component({
  selector: 'app-root',
  standalone: true,   // ✅ REQUIRED
  imports: [Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('haarish_perfume');
}
