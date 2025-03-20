# Food Swiper

Une application mobile style Tinder pour choisir son menu du jour! Swipe à droite pour ajouter un repas à tes favoris, swipe à gauche pour passer au suivant.

## Technologies utilisées

- React Native
- Expo
- Firebase (Firestore et Authentication)
- React Navigation

## Fonctionnalités

- Swipe de repas façon Tinder
- Ajout de repas favoris
- Gestion de compte utilisateur
- Interface utilisateur moderne et intuitive

## Installation

1. Cloner le dépôt
```bash
git clone <url-du-repo>
cd FoodSwiper
```

2. Installer les dépendances
```bash
npm install
```

3. Configuration Firebase
   - Créer un projet Firebase sur [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Activer Firestore et Authentication
   - Ajouter une application Web à votre projet Firebase
   - Remplacer les identifiants Firebase dans `config/firebase.ts` par les vôtres

4. Démarrer l'application
```bash
npm start
```

5. Scanner le QR code avec l'application Expo Go sur votre appareil Android ou iOS, ou utiliser un émulateur.

## Structure du projet

```
FoodSwiper/
├── app/                 # Composants de l'application (Expo Router)
│   ├── (tabs)/          # Onglets principaux
│   │   ├── index.tsx    # Écran de découverte des repas
│   │   ├── favorites.tsx # Écran des favoris
│   │   └── profile.tsx  # Écran de profil
│   └── _layout.tsx      # Layout principal
├── assets/              # Images, polices, etc.
├── components/          # Composants réutilisables
│   ├── MealCard.tsx     # Carte de repas
│   └── MealSwiper.tsx   # Composant de swipe
├── config/              # Configuration
│   └── firebase.ts      # Configuration Firebase
├── services/            # Services
│   └── mealService.ts   # Service pour les repas
└── types/               # Types TypeScript
    └── index.ts         # Définitions des types
```

## À faire

- Ajouter une fonctionnalité de filtrage des repas par catégorie
- Implémenter un système de notation des repas
- Ajouter des recettes détaillées
- Améliorer l'expérience utilisateur avec des animations supplémentaires

## Captures d'écran

[À ajouter]

## Licence

MIT
