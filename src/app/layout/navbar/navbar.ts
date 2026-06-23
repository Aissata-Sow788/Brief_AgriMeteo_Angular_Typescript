import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  today = new Date();
  // afficher l'heure aussi en format 24h 
  currentTime = new Date().toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric', hour12: false });
}
