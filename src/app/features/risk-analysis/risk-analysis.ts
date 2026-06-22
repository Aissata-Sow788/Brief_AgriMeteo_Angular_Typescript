
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);


@Component({
  selector: 'app-risk-analysis',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './risk-analysis.html',
  styleUrl: './risk-analysis.css'
})
export class RiskAnalysis implements OnInit, AfterViewInit {
  chart: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart() {
    // Calcul des 7 prochains jours à titre d'exemple
    const labels = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    // Données de prévisions (ex: niveau de stock, ventes, budget)
    const data = {
      labels: labels,
      datasets: [{
        label: 'Prévisions à 7 jours',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(173, 192, 75)',
                backgroundColor: [
          '#4CAF50',
          '#FFC107',
          '#2196F3'
        ],
        tension: 0.1
      }]
    };

    this.chart = new Chart("canvasPrevisions", {
      type: 'bar', // ou 'bar' pour un histogramme
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }
}
