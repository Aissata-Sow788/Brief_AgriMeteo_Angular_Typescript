import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { WeatherResponse } from '../../core/services/weather.service';
import { RiskService } from '../../core/services/risk';
import { PredictionService } from '../../core/services/prediction';
import { Risk } from '../../core/models/risk.model';
import { PredictionData } from '../../core/models/prediction.model';

Chart.register(...registerables);

@Component({
  selector: 'app-risk-analysis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risk-analysis.html',
  styleUrl: './risk-analysis.css'
})
export class RiskAnalysis implements OnChanges, AfterViewInit {

  // Reçoit les données météo depuis le Dashboard parent
  @Input() meteo: WeatherResponse | null = null;
  @Input() regionNom: string = '';

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  risk: Risk | null = null;
  prediction: PredictionData | null = null;
  private chart: Chart | null = null;

  constructor(
    private riskService: RiskService,
    private predictionService: PredictionService
  ) {}

  ngAfterViewInit(): void {
    // Si les données sont déjà là au montage, on crée le graphique
    if (this.meteo) {
      this.mettreAJour();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['meteo'] && this.meteo) {
      this.mettreAJour();
    }
  }

  private mettreAJour(): void {
    if (!this.meteo) return;

    const temp = this.meteo.main.temp;
    const humidity = this.meteo.main.humidity;

    // 1. Calcul de l'indice de risque
    this.risk = this.riskService.calculateRisk(temp, humidity);

    // 2. Génération de la série 7 jours simulée
    this.prediction = this.predictionService.genererSerie7Jours(temp, this.regionNom);

    // 3. Mise à jour ou création du graphique
    if (this.chartCanvas) {
      if (this.chart) {
        this.mettreAJourGraphique();
      } else {
        this.creerGraphique();
      }
    }
  }

  private creerGraphique(): void {
    if (!this.chartCanvas || !this.prediction || !this.risk) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.prediction.labels,
        datasets: [{
          label: `Température — ${this.prediction.regionNom}`,
          data: this.prediction.temperatures,
          borderColor: this.risk.color,
          backgroundColor: this.risk.color + '22', // transparence
          borderWidth: 2.5,
          pointBackgroundColor: this.risk.color,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        animation: { duration: 600, easing: 'easeInOutQuart' },
        plugins: {
          legend: {
            labels: { color: 'rgba(255,255,255,0.7)', font: { size: 11 } }
          },
          tooltip: {
            callbacks: {
             label: ctx => ` ${(ctx.parsed.y ?? 0).toFixed(1)}°C`
            }
          }
        },
        scales: {
          x: {
            ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 10 } },
            grid: { color: 'rgba(255,255,255,0.05)' }
          },
          y: {
            ticks: {
              color: 'rgba(255,255,255,0.5)',
              font: { size: 10 },
              callback: v => `${v}°C`
            },
            grid: { color: 'rgba(255,255,255,0.05)' }
          }
        }
      }
    });
  }

  private mettreAJourGraphique(): void {
    if (!this.chart || !this.prediction || !this.risk) return;

    this.chart.data.labels = this.prediction.labels;
    this.chart.data.datasets[0].data = this.prediction.temperatures;
    this.chart.data.datasets[0].label = `Température — ${this.prediction.regionNom}`;
    (this.chart.data.datasets[0] as any).borderColor = this.risk.color;
    (this.chart.data.datasets[0] as any).backgroundColor = this.risk.color + '22';
    (this.chart.data.datasets[0] as any).pointBackgroundColor = this.risk.color;
    this.chart.update('active');
  }
}