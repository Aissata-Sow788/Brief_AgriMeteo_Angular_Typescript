import { Component, OnInit } from '@angular/core';
import { WeatherService, WeatherResponse } from '../../core/services/weather.service';
import { GeolocationService } from '../../core/services/geolocation.service';
import { REGIONS_SENEGAL } from '../../data/regions.data';
import { trouverRegionLaPlusProche } from '../../data/region-finder.util';
import { Region } from '../../core/models/weather.model';
import { Map } from "../map/map";
import { Subscription } from 'rxjs';
import { RiskAnalysis } from '../risk-analysis/risk-analysis';


const REGION_PAR_DEFAUT = REGIONS_SENEGAL.find(r => r.nom === 'Dakar')!;

function estDansLeSenegal(lat: number, lon: number): boolean {
  return lat >= 12.0 && lat <= 16.8 && lon >= -17.7 && lon <= -11.2;
}

@Component({
  selector: 'app-dashboard',
  imports: [Map, RiskAnalysis],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  meteo: WeatherResponse | null = null;
  regionActuelle: Region | null = null;
  chargement = false;
  erreur: string | null = null;


  private geoSubscription?: Subscription;


  constructor(
    private weatherService: WeatherService,
    private geoService: GeolocationService
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
          // Position valide mais hors Sénégal → fallback Dakar
          this.chargerMeteo(REGION_PAR_DEFAUT);
        }
      },
      error: () => {
        // Refus, timeout, ou indisponible → fallback Dakar
        this.chargerMeteo(REGION_PAR_DEFAUT);
      }
    });
  }

  chargerMeteo(region: Region) {
    this.geoSubscription?.unsubscribe();
  // Méthode appelée quand l'utilisateur clique sur une région de la carte
  // (déclenchée par (regionSelectionnee)="chargerMeteo($event)" dans dashboard.html)

    this.regionActuelle = region;
    // On mémorise la région cliquée (pour afficher son nom plus tard)

    this.chargement = true;
    // On active l'état "chargement" → le template affiche "Chargement..."

    this.erreur = null;
    // On efface une éventuelle erreur précédente,
    // pour ne pas garder un vieux message d'erreur affiché pendant un nouveau chargement



    this.weatherService.getWeatherByCoords(region.lat, region.lon).subscribe({
    // On appelle la méthode du service avec les coordonnées de la région.
    // Elle renvoie un Observable (un flux de données asynchrone),
    // donc on doit s'y "abonner" avec .subscribe() pour recevoir le résultat

      next: (data) => {
      // "next" = la fonction appelée QUAND la requête réussit, avec "data" = la réponse de l'API

        this.meteo = data;
        // On stocke les données météo reçues → ça déclenche l'affichage du panneau
        // (le @if (meteo; as m) devient vrai)

        this.chargement = false;
        // On désactive l'état de chargement, la requête est terminée

      },

      error: (err) => {
      // "error" = la fonction appelée SI la requête échoue (ex: clé API invalide, pas de réseau...)

        this.erreur = 'Impossible de récupérer la météo pour cette région.';
        // On stocke un message clair à afficher à l'utilisateur

        this.chargement = false;

        // On désactive aussi le chargement ici, sinon "Chargement..." resterait affiché indéfiniment

        console.error(err);
        // On affiche le détail technique de l'erreur dans la console du navigateur,
        // utile pour toi en développement (l'utilisateur final ne le voit pas)
      }
    });
  }
}












