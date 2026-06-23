import { Component } from '@angular/core';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';
import { Dashboard } from './features/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}