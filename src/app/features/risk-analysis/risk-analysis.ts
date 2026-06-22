import { Component } from '@angular/core';
import {
  ChartConfiguration,
  ChartOptions,
  ChartType
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-risk-analysis',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './risk-analysis.html',
  styleUrl: './risk-analysis.css'
})
export class RiskAnalysis {

  public chartType: 'bar' = 'bar';

  public chartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor'],
    datasets: [
      {
        label: 'Température (°C)',
        data: [31, 29, 32, 35, 30]
      }
    ]
  };

  public chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false
  };



}
