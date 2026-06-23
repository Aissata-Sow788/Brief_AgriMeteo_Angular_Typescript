import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `
    <div class="flex flex-col items-center justify-center gap-3 py-6">
      <div class="spinner-ring"></div>
      <p class="text-sm text-white/50 animate-pulse">Récupération des données météo...</p>
    </div>
  `,
  styles: [`
    .spinner-ring {
      width: 44px;
      height: 44px;
      border: 3px solid rgba(255,255,255,0.1);
      border-top-color: #34d399;
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class Spinner {}