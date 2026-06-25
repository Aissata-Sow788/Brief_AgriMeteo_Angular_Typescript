#  AgriMétéo Sénégal

> Plateforme de monitoring climatique dédiée à l'agriculture sénégalaise. 
> Transformons l'incertitude météo en décision agricole.

## Lien deploiement sur vercel
- https://brief-agri-meteo-angular-typescript.vercel.app/

## Lien demonstration video
- https://drive.google.com/drive/folders/17MBzVWS81wD3qhgBCsdDwby6eloU8O7i?usp=sharing

## Lien maquette sur Figma
- https://www.figma.com/design/pneiErM78LJvSAf3ncCbpm/Sans-titre?node-id=1-290&t=eKO6CZ5CJUnfRFOh-1
## Lien GitHub
- https://github.com/Aissata-Sow788/Brief_AgriMeteo_Angular_Typescript.git 

---

##  Présentation

**AgriMétéo Sénégal** est une Single Page Application (SPA) Angular qui permet aux acteurs agricoles sénégalais (agriculteurs, coopératives, autorités locales) de visualiser en temps réel les conditions météorologiques des 14 régions administratives du Sénégal et d'évaluer les risques climatiques pour leurs cultures.

### Problème résolu
Au Sénégal, l'agriculture dépend largement des aléas climatiques. Une mauvaise anticipation entraîne des pertes de récoltes importantes. AgriMétéo transforme cette incertitude en **information décisionnelle**.

---

##  Fonctionnalités

| Fonctionnalité | Description |
|---|---|
|  Carte interactive | SVG des 14 régions, hover + sélection colorée |
|  Météo en temps réel | Données OpenWeatherMap au clic sur une région |
|  Géolocalisation | Détection automatique de la région la plus proche |
|  Indice de risque | Algorithme `calculateRisk(temp, humidity)` → score/100 |
| Analyse 7 jours | Série temporelle simulée autour de la temp actuelle |
|  Gestion d'erreurs | Spinner de chargement + messages d'erreur conviviaux |

---

##  Architecture

```
src/app/
├── core/
│   ├── models/
│   │   ├── weather.model.ts      ← Interface Region
│   │   ├── risk.model.ts         ← Interface Risk { score, label, color }
│   │   └── prediction.model.ts   ← Interface PredictionData
│   └── services/
│       ├── weather.service.ts    ← Appels API OpenWeatherMap
│       ├── geolocation.service.ts ← GPS utilisateur (Observable)
│       ├── risk.ts               ← calculateRisk() — logique métier pure
│       └── prediction.ts         ← genererSerie7Jours() — simulation
├── data/
│   ├── regions.data.ts           ← 14 régions avec coordonnées GPS
│   └── region-finder.util.ts     ← Algorithme Haversine (région la plus proche)
├── features/
│   ├── map/                      ← Carte SVG interactive Sénégal
│   ├── dashboard/                ← Orchestrateur principal
│   └── risk-analysis/            ← Badge risque + graphique Chart.js
├── layout/
│   ├── navbar/                   ← Barre de navigation
│   └── footer/                   ← Pied de page
└── shared/
    └── spinner/                  ← Indicateur de chargement
```

### Principe de découplage (brief respecté)
- **Logique métier** → `core/services/` (aucune dépendance Angular UI)
- **Interface** → `features/` (composants purs, reçoivent des données via `@Input()`)
- **Données statiques** → `data/` (séparées des services)

---

##  Algorithme de l'Indice de Risque Agricole

Fonction pure `calculateRisk(temp: number, humidity: number): Risk`

| Condition | Score | Label | Couleur |
|---|---|---|---|
| temp > 40°C ET humidité < 20% | 95 | Sécheresse Critique | `#7F0000` |
| temp > 38°C ET humidité > 60% | 85 | Risque Canicule Élevé | `#FF4500` |
| temp > 35°C ET humidité > 50% | 70 | Stress Thermique | `#FF8C00` |
| temp < 28°C ET humidité > 85% | 65 | Risque Inondation | `#1565C0` |
| 24°C ≤ temp ≤ 32°C ET 40% ≤ hum ≤ 70% | 15 | Conditions Favorables | `#2E7D32` |
| temp > 32°C OU humidité > 75% | 45 | Risque Modéré | `#F9A825` |
| Autres cas | 25 | Risque Faible | `#388E3C` |

### Simulation des 7 derniers jours
```
Pour chaque jour J-6 à J-1 : tempSimulée = tempActuelle + (random * 6 - 3)
Pour J0 (aujourd'hui)       : tempRéelle retournée par l'API
```
Variation de ±3°C autour de la valeur réelle — cohérent avec les fluctuations climatiques sénégalaises.

---

##  Installation & Lancement

### Prérequis
- Node.js ≥ 18
- Angular CLI ≥ 17
- Clé API OpenWeatherMap (gratuite sur [openweathermap.org](https://openweathermap.org/api))

### Étapes

```bash
# 1. Cloner le repository
git clone https://github.com/Aissata-Sow788/Brief_AgriMeteo_Angular_Typescript.git
cd Brief_AgriMeteo_Angular_Typescript

# 2. Installer les dépendances
npm install

# 3. Configurer la clé API
# Dans src/environments/environment.development.ts :
# openWeatherApiKey: 'VOTRE_CLE_API'

# 4. Lancer le serveur de développement
ng serve

# 5. Ouvrir dans le navigateur
# http://localhost:4200
```
#6. Pour creer un composant on met: 

#```bash
ng generate component component-name
```

### Build de production
```bash
ng build --configuration=production
```

---

##  Configuration environnement

```typescript
// src/environments/environment.development.ts
export const environment = {
  production: false,
  openWeatherApiKey: 'YOUR_API_KEY_HERE',  // ← Ne jamais commiter la vraie clé
  openWeatherBaseUrl: 'https://api.openweathermap.org/data/2.5'
};
```

>  La clé API est protégée par GitHub Secret Scanning. Ne jamais la commiter.

---

##  Technologies utilisées

| Technologie | Version | Usage |
|---|---|---|
| Angular | 17+ | Framework SPA, composants standalone |
| TypeScript | 5+ | Typage statique, interfaces |
| Chart.js | 4+ | Graphique linéaire températures 7j |
| OpenWeatherMap API | 2.5 | Données météo temps réel |
| TailwindCSS | 3+ | Styles utilitaires |

---

##  Équipe

| Membre | Rôle |
|---|---|
| **Aissata SOW** | Initialisation projet, SVG carte, WeatherService, structure Git |
| **Binetou GUEYE** | RiskService, PredictionService, RiskAnalysis, Spinner, Footer, intégration UI |

---

## Livrables

- [x] Code source (repository GitHub)
- [x] README (ce fichier)
- [x] Documentation technique
- [x] Répartition des tâches
- [x] Wireframe
- [x] Vidéo démo
- [x] Lien déployé (Vercel)


README.md
