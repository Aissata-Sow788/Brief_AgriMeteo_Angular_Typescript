import { Region } from '../core/models/weather.model';
import { REGIONS_SENEGAL } from './regions.data';
import { distanceKm } from '../utils/distance.util';

export function trouverRegionLaPlusProche(lat: number, lon: number): Region {
  let regionProche = REGIONS_SENEGAL[0];
  let distanceMin = Infinity;

  for (const region of REGIONS_SENEGAL) {
    const d = distanceKm(lat, lon, region.lat, region.lon);
    if (d < distanceMin) {
      distanceMin = d;
      regionProche = region;
    }
  }
  return regionProche;
}
