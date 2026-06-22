import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface WeatherResponse {
// On définit la FORME des données qu'on attend en retour de l'API OpenWeatherMap.

  main: {
    temp: number;
    // La température actuelle, en °C (grâce à units=metric dans la requête)

    humidity: number;
    // Le taux d'humidité, en %

    feels_like: number;
    // La température "ressentie" (prend en compte le vent, l'humidité...)
  };
  // "main" regroupe ces 3 valeurs, exactement comme l'API les renvoie sous une clé "main"

  weather: { description: string; icon: string }[];
  // "weather" est un TABLEAU (l'API renvoie toujours une liste, même s'il n'y a qu'un élément).
  // Chaque élément contient :
  // - description : texte en français ("ciel dégagé", "pluie légère"...)
  // - icon : un code (ex: "01d") utilisé pour construire l'URL de l'icône météo

  wind: { speed: number };
  // La vitesse du vent, en m/s

  name: string;
  // Le nom du lieu renvoyé par l'API elle-même (pas forcément utilisé,
  // puisque tu affiches plutôt regionActuelle?.nom dans ton dashboard)
}

@Injectable({ providedIn: 'root' })
// @Injectable() : indique à Angular que cette classe peut être "injectée"
// dans d'autres composants (via le constructeur).
//
// { providedIn: 'root' } : crée UNE SEULE instance de ce service pour toute l'application
// (singleton) — tous les composants qui l'utilisent partagent la même instance,
// pas besoin de le déclarer dans un module

export class WeatherService {
// Déclaration de la classe qui contient toute la logique d'appel à l'API météo

  private apiKey = environment.openWeatherApiKey;
  // Récupère ta clé API depuis le fichier environment.ts.
  // "private" veut dire que seule cette classe peut accéder à cette variable
  // (les composants qui utilisent ce service n'y ont pas accès directement)

  private baseUrl = environment.openWeatherBaseUrl;
  // Récupère l'URL de base de l'API (https://api.openweathermap.org/data/2.5),
  // toujours depuis environment.ts — pratique si jamais l'URL change un jour,
  // tu ne la modifies qu'à un seul endroit

   //  Injection du client HTTP Angular
  constructor(private http: HttpClient) {}
  // Angular injecte automatiquement une instance de HttpClient ici.
  // "private http" la rend accessible partout dans la classe via this.http,
  // sans avoir à la redéclarer en haut de la classe.
  // HttpClient est le module Angular qui sait faire des requêtes GET/POST/etc.

   // Récupère la météo selon latitude et longitude
  getWeatherByCoords(lat: number, lon: number): Observable<WeatherResponse> {
  // Méthode publique appelée depuis Dashboard (this.weatherService.getWeatherByCoords(...)).
  // Elle reçoit lat et lon en paramètres,
  // et renvoie un Observable<WeatherResponse> :
  // un "flux" de données auquel on doit s'abonner (.subscribe()) pour récupérer le résultat,
  // typé pour contenir exactement la forme définie par l'interface WeatherResponse

    const url = `${this.baseUrl}/weather`;
    // Construit l'URL complète de l'endpoint "current weather",
    // ex: https://api.openweathermap.org/data/2.5/weather

    const params = {
    // Objet contenant tous les paramètres de requête (ce qui ira après le "?" dans l'URL)

      lat: lat.toString(),
      // La latitude, convertie en texte (HttpClient attend des chaînes pour les params)

      lon: lon.toString(),
      // La longitude, convertie en texte

      appid: this.apiKey,
      // Ta clé API, obligatoire pour que la requête soit acceptée

      units: 'metric',
      // Demande à l'API de renvoyer la température en °C plutôt qu'en Kelvin par défaut

      lang: 'fr'
      // Demande à l'API de renvoyer la description météo en français
      // (ex: "ciel dégagé" plutôt que "clear sky")
    };

    return this.http.get<WeatherResponse>(url, { params });
    // Envoie la requête GET vers l'URL, avec les paramètres ci-dessus.
    // <WeatherResponse> indique à TypeScript : "la réponse aura cette forme précise" —
    // ça te permet d'avoir l'autocomplétion (data.main.temp, etc.) côté Dashboard.

    // Cette ligne ne fait PAS la requête immédiatement :
    // elle renvoie un Observable "froid", qui ne s'exécute que quand on fait .subscribe()
    // (c'est ce que fait Dashboard.chargerMeteo())
  }
}
