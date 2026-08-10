# Prompt à donner à Claude Code : finalisation du site Kiirobi

Copie-colle l'intégralité de ce document dans Claude Code, à la racine du repo (`Execute CE Prompt`). Il contient le contexte, le cahier des charges complet et la liste des correctifs identifiés lors de la revue de la maquette.

---

## 1. Contexte du projet

Tu travailles sur le site web one-page de **Kiirobi**, agence de communication et de production basée à Nouakchott, Mauritanie. Le client a déjà validé une maquette. Cette maquette n'est pas un fichier Figma statique : c'est un prototype **Figma Make** livré directement en code (React 19 + Vite + TypeScript + Tailwind CSS v4), fonctionnel, présent dans ce repo.

Fichiers clés existants :
- `src/App.tsx` : composant principal, contient tout le site (header, hero, sections 00 à 05, contact, footer, modale mentions légales)
- `src/index.css` : design tokens (variables CSS de couleurs), polices, animations, classes utilitaires
- `index.html` : shell Vite, actuellement vide de balises SEO
- `src/imports/pasted_text/kiirobi-website-mockup.md` : cahier des charges original du client (repris intégralement en section 2 ci-dessous)

Ta mission : partir de ce prototype validé et le transformer en site de production livrable, en corrigeant les bugs identifiés, en connectant les fonctionnalités qui sont aujourd'hui décoratives, et en respectant scrupuleusement le cahier des charges ci-dessous. Ne repars pas de zéro : améliore le code existant en conservant sa structure et son style (styles inline + quelques classes utilitaires, cohérent avec l'existant), sauf si tu identifies une raison technique clairement meilleure.

---

## 2. Cahier des charges original (validé par le client)

```
Crée une maquette de site web one-page (scroll unique, navigation par ancres) pour Kiirobi, agence de communication et de production basée à Nouakchott, Mauritanie. Respecte la structure de sections décrite ci-dessous, avec un habillage visuel propre à la marque Kiirobi.

IDENTITÉ VISUELLE
- Couleur principale : turquoise #008E8C (bandeaux de titre, boutons, éléments actifs)
- Couleur secondaire : bordeaux/magenta #7B0A45 (fonds de section sombres, accents forts)
- Noir #1A1A1A pour le texte et le logo, fond blanc #FFFFFF pour le corps du site
- Couleurs d'accent décoratives, à utiliser avec parcimonie sur des pastilles, puces ou tags : corail #EE545C, bleu #1980BA, vert menthe #73C39C, or #F8BA40
- Logo : wordmark "Kiirobi" en noir, condensé et bold, avec un pictogramme en forme d'arbre/circuit imprimé (lignes fines se ramifiant vers des nœuds ronds colorés dans les 4 couleurs d'accent). Utilise ce pictogramme comme élément graphique récurrent (favicon, fond de section en filigrane, animation du hero)
- Typographie : une police sans-serif bold et condensée pour les grands titres, une police sans-serif classique et lisible pour le corps de texte
- Formes géométriques en filigrane (faible opacité, ton turquoise ou bordeaux) en arrière-plan de certaines sections, dans l'esprit du pictogramme de la marque
- Pas de coins arrondis excessifs, esthétique institutionnelle et professionnelle plutôt que "startup"

FORMAT GÉNÉRAL
- Site one-page desktop (1440px), scroll vertical fluide
- Header sticky, transparent au départ puis fond blanc avec ombre légère au scroll
- Chaque grande section a un numéro affiché en grand (00 à 05), police condensée, en gris clair ou en turquoise à faible opacité

1. HEADER
- Logo Kiirobi à gauche (wordmark + pictogramme)
- Menu horizontal : À propos / Nos valeurs / Notre expertise / Nos clients / Contact
- Toggle de langue FR / AR à droite (contexte mauritanien)
- Version mobile : menu burger en drawer plein écran

2. HERO
- Grand pictogramme du logo (arbre/circuit) qui s'anime : les lignes se dessinent progressivement et les nœuds colorés apparaissent un par un
- Accroche en 2 lignes : "L'agence de communication qui connecte vos idées à vos publics"
- Sous-titre : "Kiirobi est une agence de communication spécialisée en Conseil, Création, Évènementiel, Élaboration et mise en place de stratégies web, communication digitale et production de contenus multimédias."
- CTA discret en bas : "Découvrir l'agence" avec flèche vers le bas

3. SECTION 00, Positionnement (fond bordeaux #7B0A45, texte blanc)
- Chiffre 00 en filigrane
- Citation en grand format, centrée : "L'excellence et le sens du détail comme devise fondamentale"
- Ligne de séparation
- Paragraphe en dessous, taille moyenne : "Basée en Mauritanie, Kiirobi intervient en tant que régie publicitaire et agence de production au niveau national et dans la sous-région. Kiirobi appuie son action de production audiovisuelle par la capitalisation sur l'expertise de son média digital Tawatur, première plateforme mauritanienne en termes de visibilité, de taux de pénétration et d'impact sur l'opinion publique."

4. SECTION 01, KIIROBI EST EXCELLENTE (fond blanc)
- Chiffre 01 en grand, titre deux lignes "KIIROBI EST" / "EXCELLENTE"
- Paragraphe à gauche : "Un engagement envers l'excellence qui se reflète dans la qualité de nos productions. Plus de 12 000 vidéos produites et diffusées sur les réseaux sociaux via les canaux de notre média digital Tawatur."
- À droite : bloc vidéo avec bouton play custom et légende "Voir nos productions audiovisuelles", puis une image avec légende "Accompagnement médiatique et audiovisuel pour les agences des Nations Unies (FAO, PAM, UNICEF)"

5. SECTION 02, KIIROBI EST CRÉATIVE (fond blanc)
- Chiffre 02 en grand, titre deux lignes "KIIROBI EST" / "CRÉATIVE"
- Paragraphe à gauche : "Le Studio Kiirobi réunit une équipe multidisciplinaire de graphistes, web designers, développeurs, community managers et chefs de projet, dans un processus continu et interconnecté qui vise à fournir des solutions de communication de haute qualité, efficaces et personnalisées."
- Image à droite avec légende : "Création d'identités visuelles, motion design et contenus sur mesure pour nos clients"

6. SECTION 03, KIIROBI EST TRANSPARENTE (fond blanc)
- Chiffre 03 en grand, titre deux lignes "KIIROBI EST" / "TRANSPARENTE"
- Paragraphe à gauche : "Un suivi attentif et un accompagnement étroit à chaque étape, pour maximiser les avantages de nos services. Nous croyons en une relation de long terme avec nos clients, où leur succès est notre priorité constante, dans le cadre d'une étroite collaboration avec des acteurs du secteur privé et public, des ONG internationales et les agences des Nations Unies."
- Image à droite avec légende : "Coordination sur le terrain avec le SWEDD et la Banque mondiale"

7. SECTION 04, KIIROBI EST TECHNOLOGIQUE (fond blanc)
- Chiffre 04 en grand, titre deux lignes "KIIROBI EST" / "TECHNOLOGIQUE"
- Paragraphe intro courte sur la maîtrise technique (tournage, drone, studio, montage, post-production)
- Image pleine largeur avec légende
- Sous-titre : "Nous proposons 4 pôles d'expertise"
- Grille de 4 items, chacun avec numéro (01-04), ligne séparatrice verticale, titre court, description en une phrase avec prestations séparées par des slashs :
  01 Conseil & Stratégie : Conseil éditorial / Stratégie de communication / Planning stratégique digital / Veille et e-réputation
  02 Digital & Web : Web & webdesign / Social media management / Community management / Media planning / Traffic management
  03 Design & Branding : Design graphique / Identité visuelle / Illustration / Branding et rebranding
  04 Production & Événementiel : Production audiovisuelle TV/Web/Radio / Reportages / Motion design / Relations publiques et presse / Événementiel

8. SECTION 05, Nos clients
- Chiffre 05 en grand, titre "ILS NOUS FONT CONFIANCE"
- Grille de cards clients (3 colonnes), chaque card avec logo, texte descriptif de la mission (2-3 lignes), tags de prestations en bas
- Cards à prévoir pour : UNICEF, World Vision, PAM & FAO, SWEDD, SNIM, Bankily-BPM, VISA, GIMTEL, BPC, Grande Muraille Verte, PEJ, UBM, Same Paris, Union Européenne, Tasiast Mauritanie, DipNdip

9. SECTION CONTACT
- Titre trois lignes : "PARLONS DE" / "VOTRE" / "PROJET"
- Formulaire : Nom, Email, Téléphone, Message (textarea), checkbox de consentement, bouton "ENVOYER" en turquoise
- Bloc de coordonnées directes à côté du formulaire : email bridge@kiirobi.com, téléphones 36 13 43 49 et +222 20 43 29 30, adresse "Près de Sheraton Hotel, TVZ, Nouakchott, Mauritanie"

10. FOOTER (fond bordeaux #7B0A45 ou noir)
- Logo Kiirobi + tagline "Agence de Communication & Production"
- Copyright "Kiirobi © 2026"
- Lien "Mentions légales" ouvrant une modale avec les blocs standards (éditeur, hébergeur, données personnelles, propriété intellectuelle, cookies)

STYLE / MICRO-INTERACTIONS
- Fade-up au scroll pour chaque bloc de texte et d'image
- Parallaxe léger sur le pictogramme de fond et les visuels
- Contraste fort entre les sections sombres (00, footer) et les sections blanches
- Aucune barre d'accent colorée sous les titres, aucun bandeau décoratif sur les bords des cards

Livre la maquette en desktop puis en version mobile responsive (menu burger, sections empilées, grille clients en 1 colonne).
```

Le prototype actuel respecte déjà cette structure dans les grandes lignes. Le travail ci-dessous porte sur la finition, la correction de bugs, et la connexion des fonctionnalités qui sont aujourd'hui décoratives.

---

## 3. Bugs et régressions identifiés (à corriger en priorité)

1. **Menu mobile cassé.** Dans le header (`src/App.tsx`), la `<nav>` desktop porte à la fois `className="hidden md:flex"` et un `style={{ display: 'flex', ... }}` inline. Le style inline prime toujours sur la classe Tailwind, donc le menu desktop reste affiché sur mobile, en superposition avec le burger. Corrige en retirant `display` du style inline (garde uniquement les autres propriétés comme `gap`) et laisse la classe Tailwind gérer l'affichage responsive. Vérifie qu'il n'y a pas d'autre endroit dans le fichier où un style inline `display` entre en conflit avec une classe responsive Tailwind.

2. **Toggle FR/AR purement décoratif.** Le bouton change un state `lang` mais n'a aucun effet : pas de traduction du contenu, pas de bascule en `dir="rtl"`. Voir section 4 pour la décision à prendre et l'implémentation attendue.

3. **Formulaire de contact non connecté.** Le `onSubmit` se contente de passer un state local `sent` à `true`. Aucune donnée n'est réellement transmise nulle part. Voir section 4.

4. **`index.html` vide de toute balise SEO.** Pas de `<title>`, pas de meta description, pas de favicon, attribut `lang` non renseigné (`<!-- figma:lang -->` encore présent). Voir section 5.

5. **Bouton play vidéo (section 01) purement décoratif.** Aucune vidéo n'est réellement liée ni jouable.

6. **Modale "Mentions légales" sans gestion clavier ni accessibilité.** Pas de fermeture au clavier (Echap), pas d'attribut `role="dialog"` / `aria-modal="true"`, pas de verrouillage du scroll du body en arrière-plan, pas de focus trap.

---

## 4. Fonctionnalités à finaliser (décisions à prendre puis implémenter)

### 4.1 Toggle FR / AR

Le client a demandé un toggle FR/AR "contexte mauritanien" dans le brief. Actuellement ce n'est qu'un bouton décoratif. Deux options possibles, à choisir selon ce que confirme le client (si tu n'as pas l'info, implémente l'option A par défaut et signale clairement dans ton rapport final que l'option B nécessiterait une confirmation client et du contenu traduit) :

- **Option A (minimum viable)** : garder le toggle visuel tel quel pour l'instant, mais neutraliser toute ambiguïté : soit désactiver visuellement le bouton "AR" avec un état "à venir", soit le rendre pleinement fonctionnel a minima sur un sous-ensemble de contenu critique (nav, hero, contact).
- **Option B (complète)** : structurer tout le texte du site dans un dictionnaire `fr` / `ar` (fichier `src/i18n.ts` ou équivalent), basculer `document.documentElement.dir` entre `ltr` et `rtl` selon la langue active, et vérifier que la mise en page (grilles, flex, alignements de texte, icônes de flèche) reste correcte en RTL. Cela demande les traductions arabes du contenu, à obtenir du client.

Quelle que soit l'option retenue, documente ton choix dans le commit / PR.

### 4.2 Formulaire de contact

Connecte le formulaire à un vrai mécanisme d'envoi. Par défaut, utilise un service tiers simple sans backend à héberger (ex. Formspree, EmailJS, ou un endpoint serverless si l'infra de déploiement le permet), en respectant ces contraintes :
- Garde la validation HTML existante (`required` sur nom, email, message, consentement RGPD).
- Affiche un état de chargement pendant l'envoi, un état de succès (déjà présent), et un état d'erreur clair si l'envoi échoue.
- N'expose aucune clé API sensible côté client sans nécessité : privilégie un service pensé pour l'usage front pur.
- Si aucune information n'est disponible sur l'outil cible côté client (le cabinet conseil OPEO utilise HubSpot en interne, mais rien n'indique que Kiirobi l'utilise), implémente une solution générique et documente clairement dans le README comment la reconfigurer avec les vraies informations de destination (adresse `bridge@kiirobi.com` mentionnée dans le brief).

### 4.3 Bloc vidéo (section 01)

Remplace le faux bouton play par un vrai composant vidéo : soit un lecteur natif `<video>` avec poster, soit un embed (YouTube/Vimeo) si Kiirobi héberge ses vidéos ailleurs. Si aucun fichier vidéo réel n'est disponible à ce stade, garde le visuel actuel mais ajoute un commentaire `TODO` explicite dans le code à l'emplacement exact où l'intégration finale devra se faire, et signale ce point dans ton rapport.

---

## 5. Exigences qualité à respecter

### SEO / métadonnées (`index.html`)
- `<html lang="fr">` (ou `dir`/`lang` dynamique si option B du 4.1 est retenue)
- `<title>` : "Kiirobi — Agence de Communication & Production | Nouakchott, Mauritanie"
- `<meta name="description">` reprenant l'accroche du hero
- Balises Open Graph de base (`og:title`, `og:description`, `og:image`, `og:type=website`)
- Favicon basé sur le pictogramme circuit-tree (génère un SVG/PNG à partir du composant `CircuitTree` existant dans `App.tsx`)

### Accessibilité
- Ajoute des `aria-label` explicites sur : le bouton burger, les boutons de langue, les icônes unicode du bloc coordonnées (✉ ☎ ⊕), le bouton de fermeture de la modale.
- Modale mentions légales : `role="dialog"`, `aria-modal="true"`, fermeture au clavier (Echap), verrouillage du scroll du body pendant l'ouverture, focus initial placé sur la modale.
- Vérifie les contrastes de texte sur fond bordeaux (`rgba(255,255,255,0.55)` et `0.6` utilisés pour du texte secondaire) : ajuste si le ratio est insuffisant pour un texte de cette taille selon les critères WCAG AA.
- Assure une navigation clavier complète (tab order logique, focus visible sur tous les éléments interactifs).

### Performance
- Remplace toutes les images Unsplash (hotlink direct, non pérenne) par des assets réels une fois fournis par le client ; en attendant, garde une liste claire des emplacements à remplacer (commentaire `TODO ASSET` dans le code à chaque `<img>` concerné).
- Ajoute `loading="lazy"` sur les images hors du premier écran.
- Vérifie qu'aucune police ou ressource externe ne bloque le rendu initial (le `@import` Google Fonts dans `src/index.css` peut être remplacé par un `<link rel="preconnect">` + `<link>` dans `index.html` pour de meilleures performances de chargement).

### Responsive
- Corrige le bug du menu mobile (section 3, point 1).
- Vérifie à la main tous les breakpoints (mobile ~375px, tablette ~768px, desktop 1440px) pour : le header, le hero, les sections `SplitSection` (grille 2 colonnes qui doit passer en 1 colonne sur mobile), la grille des 4 pôles d'expertise (qui doit aussi s'empiler), la grille clients (doit passer en 1 colonne comme demandé dans le brief), le formulaire de contact.
- Les tailles de police en `clamp()` existent déjà pour les titres : vérifie qu'elles restent lisibles sur les petits écrans (pas de débordement horizontal).

### Contenu / assets à faire valider par le client avant mise en ligne
- Les logos clients sont aujourd'hui de simples wordmarks textuels. Remplace-les par les vrais logos une fois fournis. Attention particulière : l'utilisation des logos d'agences des Nations Unies (UNICEF, PAM, FAO, UE) nécessite en général un accord formel de ces organisations, à faire confirmer par Kiirobi avant publication.
- Le contenu de la modale "Mentions légales" est un texte générique (mentionne notamment "OVH SAS" comme hébergeur). Ce texte doit être relu et validé par le client ou son conseil juridique avant mise en ligne, il ne doit pas être considéré comme définitif.

---

## 6. Méthode de travail attendue

- Travaille par petits commits logiques (un correctif ou une fonctionnalité par commit), avec des messages clairs.
- Ne casse pas la structure existante de `App.tsx` sans raison technique forte : le client a déjà validé ce rendu visuel, l'objectif est de le finaliser, pas de le redessiner.
- Teste chaque correctif dans le navigateur (le serveur Vite est déjà lancé sur le port configuré) avant de passer au suivant.
- À la fin, produis un rapport court listant : ce qui a été corrigé, ce qui reste en attente d'un élément client (assets, traductions AR, destination du formulaire, validation juridique des mentions légales), et tout choix technique que tu as dû arbitrer toi-même.

---

## 7. Ordre de priorité suggéré

1. Bug menu mobile (correctif rapide, bloquant pour tout test responsive derrière)
2. Métadonnées SEO + favicon dans `index.html`
3. Accessibilité de la modale mentions légales
4. Formulaire de contact connecté
5. Décision et implémentation du toggle FR/AR (option A ou B)
6. Bloc vidéo section 01
7. Nettoyage performance (lazy loading, fonts, TODO assets)
8. Passage complet du responsive à la loupe sur les 3 breakpoints
