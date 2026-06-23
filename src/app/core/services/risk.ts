import { Risk} from '../models/risk.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class RiskService {
    //fonction qui calcule l'indice de risque agricole
    //en fonction de la température et de la température de couverture
    //et de la température de la zone
    //retourne un indice de risque
     calculateRisk(temp: number, humidity: number): Risk{
 
    // Règle 1 : Sécheresse critique — chaleur extrême + très faible humidité
    if (temp > 40 && humidity < 20) {
      return { score: 95, label: 'Sécheresse Critique', color: '#7F0000' };
    }
 
    // Règle 2 : Canicule humide — dangereux pour les cultures et le bétail
    if (temp > 38 && humidity > 60) {
      return { score: 85, label: 'Risque Canicule Élevé', color: '#FF4500' };
    }
 
    // Règle 3 : Stress thermique — productivité des cultures réduite
    if (temp > 35 && humidity > 50) {
      return { score: 70, label: 'Stress Thermique', color: '#FF8C00' };
    }
 
    // Règle 4 : Risque inondation — hivernage, humidité très élevée
    if (temp < 28 && humidity > 85) {
      return { score: 65, label: 'Risque Inondation', color: '#1565C0' };
    }
 
    // Règle 5 : Conditions optimales pour l'agriculture sénégalaise
    if (temp >= 24 && temp <= 32 && humidity >= 40 && humidity <= 70) {
      return { score: 15, label: 'Conditions Favorables', color: '#2E7D32' };
    }
 
    // Règle 6 : Risque modéré — surveiller
    if (temp > 32 || humidity > 75) {
      return { score: 45, label: 'Risque Modéré', color: '#F9A825' };
    }
 
    // Défaut : risque faible
    return { score: 25, label: 'Risque Faible', color: '#388E3C' };
  }
}
 