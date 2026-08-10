# Kiirobi — site web

Site one-page pour **Kiirobi**, agence de communication et de production audiovisuelle basée à Nouakchott, Mauritanie.

Prototype initial généré avec Figma Make, finalisé pour la production (SEO, accessibilité, animations, corrections de bugs).

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`, pas de fichier de config séparé)
- pnpm (version pinnée dans `.mise.toml`)

## Démarrage

```bash
pnpm install
pnpm dev       # serveur de dev sur http://localhost:8443
```

## Build

```bash
pnpm build     # génère dist/
pnpm preview   # prévisualise le build de production
```

## Structure

- `src/App.tsx` — composant principal (header, hero, sections 00–05, contact, footer, modale mentions légales)
- `src/index.css` — design tokens, polices, animations, classes utilitaires
- `index.html` — shell Vite (placeholders `<!-- figma:* -->` remplacés au build par `.figma/make/site.json`, ne pas hardcoder ces valeurs directement)
- `.figma/make/site.json` — métadonnées SEO (titre, description, langue, robots, favicon)
- `public/favicon.svg` — favicon (version statique du logo)

## À faire

- Formulaire de contact (branchement backend/envoi d'email)
- Bouton de lecture vidéo (section 01) — en attente d'une source vidéo réelle
- Logos clients (section 05) — en attente des fichiers logo et des droits d'usage confirmés (UNICEF, PAM/WFP, FAO, UE)
- QA responsive à 375 / 768 / 1440px
