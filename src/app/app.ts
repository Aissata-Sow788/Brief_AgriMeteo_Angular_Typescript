import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Sidebar } from './layout/sidebar/sidebar';
import { Footer } from './layout/footer/footer';
import { Map } from './features/map/map';
import { Dashboard } from './features/dashboard/dashboard';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Sidebar, Footer, Map, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


}
