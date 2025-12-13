import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Caurosel } from '../caurosel/caurosel';

@Component({
  selector: 'app-home',
  imports: [CommonModule,Navbar,Caurosel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  showtext: boolean = false;
  names=['Alice', 'Bob', 'Charlie', 'Diana'];

}
