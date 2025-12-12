import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [CommonModule,Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  showtext: boolean = false;
  names=['Alice', 'Bob', 'Charlie', 'Diana'];

}
