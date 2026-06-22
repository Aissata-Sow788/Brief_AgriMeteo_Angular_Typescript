import { Component, Output, EventEmitter } from '@angular/core';
import { Region } from '../../core/models/weather.model';
import { REGIONS_SENEGAL } from '../../data/regions.data';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {

  @Output() regionSelectionnee = new EventEmitter<Region>();
  // @Output() : rend cette propriété "écoutable" depuis l'extérieur du composant.
  // new EventEmitter<Region>() : crée l'outil qui sert à "émettre" (envoyer)
  // un objet de type Region vers le composant parent, quand on appelle .emit(...)

  selectedRegion = '';
  // Variable qui garde en mémoire le NOM de la région actuellement sélectionnée.
  // Initialisée à une chaîne vide '' car au départ, aucune région n'est cliquée.


  selectRegion(nomRegion: string) {
  // Méthode appelée à chaque clic sur un <path> du SVG,

    this.selectedRegion = nomRegion;
    // On met à jour la région sélectionnée avec le nom reçu.
    // Ça permet au template de savoir quelle région doit être surlignée visuellement

    const region = REGIONS_SENEGAL.find(r => r.nom === nomRegion);
    // .find() parcourt le tableau REGIONS_SENEGAL et renvoie le PREMIER élément
    // dont la propriété "nom" correspond exactement à "nomRegion".

    if (region) {
    // On vérifie que la recherche a bien trouvé quelque chose

      this.regionSelectionnee.emit(region);
      // On ENVOIE l'objet région complet (avec lat/lon) au composant parent (Dashboard).
      // C'est cette ligne qui déclenche réellement chargerMeteo($event) côté Dashboard,

    } else {
    // Sinon (aucune région trouvée dans le tableau)

      console.warn('Région introuvable dans REGIONS_SENEGAL :', nomRegion);
      // On affiche un avertissement dans la console du navigateur,

    }
  }
}
