export interface PredictionData {
  labels: string[];       // ['J-6', 'J-5', 'J-4', 'J-3', 'J-2', 'Hier', "Auj."]
  temperatures: number[]; // 7 valeurs simulées autour de la temp actuelle
  regionNom: string;
}