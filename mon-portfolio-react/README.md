# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Avantages d'utiliser un custom hook
Réutilisabilité : Vous pouvez réutiliser le hook useCampaigns dans plusieurs composants sans dupliquer la logique de récupération des données.
Séparation des préoccupations : La logique de récupération des données est séparée de la logique de rendu des composants, ce qui rend le code plus propre et plus facile à maintenir.
Gestion des erreurs : Le hook gère les erreurs de manière centralisée, ce qui simplifie la gestion des erreurs dans les composants.
En résumé, le hook useCampaigns est une manière efficace de récupérer et de gérer les données des campagnes de dons dans votre application React.
