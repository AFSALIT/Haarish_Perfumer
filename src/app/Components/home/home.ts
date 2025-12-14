import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Caurosel } from '../caurosel/caurosel';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-home',
  imports: [CommonModule, Navbar, Caurosel, Footer],
  templateUrl: './home.html',

  styleUrls: ['./home.css'],
})
export class Home {
  showtext: boolean = false;
  names=['Alice', 'Bob', 'Charlie', 'Diana'];

}
