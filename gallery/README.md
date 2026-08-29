# Photos de la galerie

## Arborescence

```
gallery/<saison>/<album>/<evenement>/         photos grand format (~1600 px de large)
gallery/<saison>/<album>/<evenement>/thumb/   vignettes (~600 px), meme nom de fichier
```

Exemple :

```
gallery/2026-2027/jeunesse/stage-rentree/01.jpg
gallery/2026-2027/jeunesse/stage-rentree/thumb/01.jpg
```

Le niveau `<evenement>` est facultatif : un album rétrospectif qui couvre toute une
saison peut poser ses photos à plat, les sections de la page suffisant à les regrouper.

```
gallery/2025-2026/retrospective/maillot.jpg
gallery/2025-2026/retrospective/thumb/maillot.jpg
```

La page HTML correspondante est `pages/galerie/<saison>-<album>.html`, et sa carte
cliquable se trouve dans `pages/galerie.html`.

## Ajouter des photos

1. Déposer les photos dans le dossier de l'événement.
2. Générer les vignettes (ImageMagick) :

   ```bash
   cd gallery/2026-2027/jeunesse/stage-rentree
   mkdir -p thumb
   mogrify -path thumb -resize 600x600^ -quality 82 -strip *.jpg
   ```

3. Réduire les originaux s'ils dépassent ~1600 px de large :

   ```bash
   mogrify -resize '1600x1600>' -quality 82 -strip *.jpg
   ```

4. Ajouter un bloc `<a class="photo">` par photo dans la page de l'album
   (un modèle commenté s'y trouve déjà). Renseigner `width`/`height` avec les
   dimensions réelles de la vignette : `identify -format "%wx%h\n" thumb/*.jpg`.

## Règles

- **Poids** : viser moins de 500 Ko par photo grand format et moins de 100 Ko par
  vignette. Certaines photos très texturées (feuillage, grain) compressent mal :
  baisser la qualité en dessous de 82 les dégrade sans gagner de poids.
- **Nommage** : un nom descriptif en minuscules, sans accent ni espace
  (`groupe.jpg`, `salle.jpg`, `remise-prix.jpg`).
- **`alt`** : toujours renseigné, il sert aussi de légende dans la lightbox.
- **Droit à l'image** : ne publier une photo de mineur que si l'autorisation
  parentale couvre explicitement la diffusion sur le site du club.
