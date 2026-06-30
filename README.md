# Prassu's 30th 🎂

A little birthday site. Static HTML/CSS/JS — no build step.

## Edit the content

Open **`content.js`**. That's the only file you need to touch. It has six blocks:

| Block | What it controls |
|---|---|
| `CONFIG` | Her name |
| `WISH_MOMENT` | Hero photo, background music, the 3 wish lines that fade in after the candles |
| `FIRSTS` | The horizontal-scrolling timeline cards |
| `PLACES` | Pins on the map |
| `REASONS` | The 30 reasons (each can have a photo) |
| `QUIZ` | Multiple-choice questions for the "Do You Remember?" game |
| `HIDDEN_HEARTS` | Title + message for the hidden-hearts finale modal |
| `MEMORY_MATCH` | Photos used in the card-flip game (auto-hides when empty) |
| `LETTER` + `LETTER_SIGNOFF` | The long letter at the end |

Every `TODO:` in that file marks a spot to personalize. The shape of each entry has a short comment above it explaining the fields.

## The Journey (the easy way — no renaming)

If you have a folder of photos and you don't want to caption them all:

1. **Drop them all into `photos/journey/`** — original filenames are fine, any extension (jpg/png/heic/webp).
2. From the project root, run:
   ```bash
   ./scan-photos.sh
   ```
3. Refresh the browser. The Journey section now shows every photo sorted by date, grouped by month, in a polaroid grid. Click any photo to open it in a lightbox; use ← / → to step through.

Re-run the script any time you add or remove photos.

**How it picks the date**
1. If the filename contains `YYYYMMDD` (most cameras' default), it uses that.
2. Otherwise it falls back to the file's modified time.

Don't worry about ordering by hand — just dump everything in.

## Add a hero photo

Drop a beautiful full-bleed photo of her into `photos/` and name it `hero.jpg`. That's it — the wish moment uses it automatically. No photo? You'll get a soft pink gradient instead.

Recommended: a portrait-style shot, at least 1600px wide, soft natural light. The vignette darkens the edges so the wish text stays readable.

## Add background music

Drop an mp3 into `music/` named `background.mp3` (or rename in `content.js`). It starts when she taps the candles and loops automatically. See `music/README.md` for format tips.

She can mute it any time using the ♫ button in the top nav.

## Add photos to the 30 reasons

Each reason in `REASONS` has a `photo` field. Set it to e.g. `'photos/reason-05.jpg'` and that image fills the top half of the card. Leave it `''` and you get a soft heart placeholder. Mix and match — you don't need photos for all 30.

## Add photos to Firsts and Map

Same pattern. Each `FIRSTS` and `PLACES` entry has a `photo` field — set the path or leave blank.

## Turn on the Memory Match game

Open `content.js` → `MEMORY_MATCH.photos`. Uncomment 6 or 8 photo paths:

```js
photos: [
  'photos/match-01.jpg',
  'photos/match-02.jpg',
  'photos/match-03.jpg',
  'photos/match-04.jpg',
  'photos/match-05.jpg',
  'photos/match-06.jpg',
  // (add 7 + 8 for a 4×4 board)
],
```

The "Match" section appears in the nav automatically. Each photo is duplicated into a pair — she flips cards to find matches.

## Fix the "Firsts" picker game

The Firsts section is now a game: 6 questions, each with 3 photo options. She picks the one that matches the memory.

I made my best guesses by looking at your earliest 15 photos. To swap an answer (or change the question, reward, or label), open `content.js` → `FIRSTS`. Each entry has:

```js
{
  q: 'Which one was our first dinner together?',
  correct: 'photos/journey/IMG_3387.jpg',
  decoys: ['photos/journey/IMG_3493.jpg', 'photos/journey/IMG_4514.jpg'],
  reward: 'The red walls, the menu we barely read…',
  label: 'our first date · July 2018',
},
```

- To **change which photo is the right answer**: swap `correct` with one of the `decoys`.
- To **change the photo options**: edit `correct` and `decoys` — any path under `photos/journey/`.
- To **rewrite the question/reward/label**: edit those strings.
- To **add or remove questions**: copy/delete entries in the array.
- To **hide the section entirely**: set `const FIRSTS = [];`.

## Fill in the Quiz

Open `content.js` → `QUIZ.questions`. For each question:
- write the question in `q`
- replace each `TODO:` option with real text
- set `correct` to the **index** (0 = first option, 1 = second, etc.) of the right answer
- write a one-line `reward` she sees when she gets it right
- optionally add a `photo` that appears with the reward

Add or remove questions freely. Leave `questions: []` to hide the section.

## The Hidden Hearts hunt

30 small pink hearts are auto-scattered across every section. She finds them by exploring — they pulse subtly. Progress saves in her browser, so closing the tab is fine. Finding all 30 → a finale modal pops up.

Customize the finale message in `content.js` → `HIDDEN_HEARTS.finaleTitle` and `finaleMessage`.

To reset progress (for testing): open browser dev tools console and run `localStorage.removeItem('prassu30_hearts_found')`.

## Preview locally

Open `index.html` in a browser. Or, from a terminal:

```bash
cd /Users/sai/Downloads/Prassu_bday
python3 -m http.server 8000
# then visit http://localhost:8000
```

(The browser audio autoplay rule requires a user click, so music only starts after she taps the candles — that's expected.)

## Deploy to GitHub Pages

```bash
cd /Users/sai/Downloads/Prassu_bday
git init
git add .
git commit -m "happy 30th"
git branch -M main
# create a new repo on GitHub first (any name; public or private both work for personal accounts)
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then on GitHub:
1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)** → **Save**
4. Wait ~1 minute. The URL appears at the top of that same Pages page.

## Structure

```
.
├── index.html      # page skeleton
├── styles.css      # all the styling
├── app.js          # interactions (confetti, map, reasons, typewriter, music)
├── content.js      # ← edit this for everything
├── photos/         # ← drop images here (hero.jpg + any others)
├── music/          # ← drop background.mp3 here
└── README.md
```
