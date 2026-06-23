import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Coordonnees {
  lat: number;
  lon: number;
}

@Injectable({ providedIn: 'root' })
export class GeolocationService {

  /**
   * Renvoie les coordonnées de l'utilisateur, ou une erreur
   * si refusé / indisponible / timeout.
   */
  obtenirPosition(): Observable<Coordonnees> {
    return new Observable((observer) => {
      if (!navigator.geolocation) {
        observer.error(new Error('Géolocalisation non supportée par ce navigateur'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          observer.complete();
        },
        (error) => {
          observer.error(error);
        },
        { timeout: 5000, enableHighAccuracy: false }
      );
    });
  }
}
