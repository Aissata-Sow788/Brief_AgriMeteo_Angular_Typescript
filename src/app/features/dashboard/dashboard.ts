import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WeatherService, WeatherResponse } from '../../core/services/weather.service';
import { GeolocationService } from '../../core/services/geolocation.service';
import { REGIONS_SENEGAL } from '../../data/regions.data';
import { trouverRegionLaPlusProche } from '../../data/region-finder.util';
import { Region } from '../../core/models/weather.model';
import { Map } from '../map/map';
import { Subscription } from 'rxjs';
import { RiskAnalysis } from '../risk-analysis/risk-analysis';
import { Spinner } from '../../shared/spinner/spinner';
import { CommonModule } from '@angular/common';

const REGION_PAR_DEFAUT = REGIONS_SENEGAL.find(r => r.nom === 'Dakar')!;

function estDansLeSenegal(lat: number, lon: number): boolean {
  return lat >= 12.0 && lat <= 16.8 && lon >= -17.7 && lon <= -11.2;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Map, RiskAnalysis, Spinner],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  meteo: WeatherResponse | null = null;
  regionActuelle: Region | null = null;
  chargement = false;
  erreur: string | null = null;

  private geoSubscription?: Subscription;

  constructor(
    private weatherService: WeatherService,
    private geoService: GeolocationService,
    private cdr: ChangeDetectorRef   // ← ajout
  ) {}

  ngOnInit() {
    this.detecterRegionUtilisateur();
  }

  private detecterRegionUtilisateur() {
    this.chargement = true;

    this.geoSubscription = this.geoService.obtenirPosition().subscribe({
      next: ({ lat, lon }) => {
        if (estDansLeSenegal(lat, lon)) {
          const region = trouverRegionLaPlusProche(lat, lon);
          this.chargerMeteo(region);
        } else {
          this.chargerMeteo(REGION_PAR_DEFAUT);
        }
      },
      error: () => {
        this.chargerMeteo(REGION_PAR_DEFAUT);
      }
    });
  }

  chargerMeteo(region: Region) {
    this.geoSubscription?.unsubscribe();
    this.regionActuelle = region;
    this.chargement = true;
    this.erreur = null;
    this.meteo = null;
    this.cdr.detectChanges();   // ← force le reset visuel

    this.weatherService.getWeatherByCoords(region.lat, region.lon).subscribe({
      next: (data) => {
        this.meteo = data;
        this.chargement = false;
        this.cdr.detectChanges();   // ← force l'affichage
      },
      error: (err) => {
        this.erreur = 'Impossible de récupérer la météo pour cette région.';
        this.chargement = false;
        this.cdr.detectChanges();   // ← force l'affichage de l'erreur
        console.error(err);
      }
    });
  }
}