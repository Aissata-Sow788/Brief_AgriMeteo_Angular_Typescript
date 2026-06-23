import { Injectable } from '@angular/core';
import { PredictionData } from '../models/prediction.model';

@Injectable({ providedIn: 'root' })
export class PredictionService {
 
  // Génère une série temporelle simulée des 7 derniers jours
  // à partir de la température actuelle retournée par l'API.
  //Variation aléatoire de +/- 3°C autour de la valeur réelle.
   
  genererSerie7Jours(tempActuelle: number, regionNom: string): PredictionData {
    const labels = ['J-6', 'J-5', 'J-4', 'J-3', 'J-2', 'Hier', "Auj."];
 
    const temperatures = labels.map((_, i) => {
      if (i === 6) {
        // Dernier point = valeur réelle de l'API
        return parseFloat(tempActuelle.toFixed(1));
      }
      // Points précédents = tempActuelle +/- 3°C aléatoire
      const variation = (Math.random() * 6) - 3;
      return parseFloat((tempActuelle + variation).toFixed(1));
    });
 
    return { labels, temperatures, regionNom };
  }
}