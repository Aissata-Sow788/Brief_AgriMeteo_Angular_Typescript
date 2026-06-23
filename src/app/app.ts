import { Component } from '@angular/core';
import { Navbar } from './layout/navbar/navbar';
import { Dashboard } from './features/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [Navbar, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}