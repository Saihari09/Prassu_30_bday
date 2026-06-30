/* =============================================================
   EDIT THIS FILE TO CUSTOMIZE EVERYTHING.
   You don't need to touch any other file.
   ============================================================= */

const CONFIG = {
  // her name (or nickname) — shows on the landing screen
  wifeName: 'Prassu',
};

/* ============ THE WISH MOMENT ============
   Plays right after she blows out the candles.
   - heroPhoto: a big beautiful photo of her (fills the screen).
                Leave '' for a soft gradient fallback.
   - music:     path to an mp3 (or any audio). Starts on the cake blow.
                Leave '' for no music.
   - wishLines: 2–4 short lines, fade in one by one. Script font.
                These are the "happy birthday" wish.
*/
const WISH_MOMENT = {
  heroPhoto: 'photos/journey/IMG_9974.jpg',
  music: 'music/Samajavaragamana - Sid Sriram.mp3',
  wishLines: [
    'Today the world celebrates you.',
    'But me — I celebrate you every single day.',
    'Here\'s to your thirties, my love. Let\'s make them ours.',
  ],
};

/* ============ JOURNEY ============
   A chronological photo journey.
   Drop ALL your photos into `photos/journey/` (any filenames are fine),
   then run `./scan-photos.sh` from the project root.
   That script writes `photos/journey-manifest.js` with every photo sorted
   by date. No renaming, no manual list. Re-run it any time you add photos.

   The Journey section auto-hides if the manifest is empty or missing.
*/
const JOURNEY = {
  title: 'Our Journey',
  lede: 'Every photo in order. Every one of them us.',
  showDates: true,  // set false to hide the month label under each photo
};

/* ============ FIRSTS — "Pick the Memory" GAME ============
   Each item is a question. She sees the question + 3 photos and picks the
   one she thinks matches. If she's right: confetti + reward. If she's wrong:
   we reveal the correct one with the same reward.

   I (Claude) made my best guesses by looking at the earliest 15 photos.
   To fix any mis-assigned photo, swap `correct` with one of `decoys`. That's it.

   - q:        the question
   - correct:  the path of the photo that's the real answer
   - decoys:   2 other photos to show alongside the correct one
   - reward:   one warm line she sees when the answer is revealed
   - label:    a short caption shown over the photo after the reveal
   Set FIRSTS = [] to hide the whole section.
*/
const FIRSTS = [
  {
    q: 'Which one was our very first hello?',
    correct: 'photos/journey/IMG_3452.jpg',
    decoys: ['photos/journey/IMG_3387.jpg', 'photos/journey/IMG_4538.jpg'],
    reward: 'That brick wall. Those name tags. The whole rest of our life starts here.',
    label: 'where it began · July 2018',
  },
  {
    q: 'Which one was our first dinner together?',
    correct: 'photos/journey/IMG_3387.jpg',
    decoys: ['photos/journey/IMG_3493.jpg', 'photos/journey/IMG_4514.jpg'],
    reward: 'The red walls, the menu we barely read because we wouldn\'t stop talking.',
    label: 'our first date · July 2018',
  },
  {
    q: 'Which one was your first birthday with me?',
    correct: 'photos/journey/IMG_3813.jpg',
    decoys: ['photos/journey/IMG_4514.jpg', 'photos/journey/IMG_7125.jpg'],
    reward: 'The first cake we cut together. I think I was more nervous than you.',
    label: 'your birthday · September 2018',
  },
  {
    q: 'Which one was our first festival night out?',
    correct: 'photos/journey/IMG_4514.jpg',
    decoys: ['photos/journey/IMG_3393.jpg', 'photos/journey/IMG_4580.jpg'],
    reward: 'Those lights, that whole night — the city felt like it was ours.',
    label: 'festival lights · November 2018',
  },
  {
    q: 'Which one was our first trip to the sea?',
    correct: 'photos/journey/IMG_4580.jpg',
    decoys: ['photos/journey/IMG_4538.jpg', 'photos/journey/IMG_4622.jpg'],
    reward: 'You. The sunset. The water. I had no idea what to do with so much.',
    label: 'the sea · November 2018',
  },
  {
    q: 'Which one was our first Valentine\'s Day?',
    correct: 'photos/journey/IMG_7125.jpg',
    decoys: ['photos/journey/IMG_3813.jpg', 'photos/journey/IMG_4622.jpg'],
    reward: 'All those red hearts. None of them as loud as mine.',
    label: 'first Valentine\'s · February 2019',
  },
];
const FIRSTS_FINALE = {
  perfect: 'You remember everything. I love that about you.',
  most: 'Close enough. I\'ll remember the rest for both of us.',
  some: 'It\'s okay — these are old photos. I remember every one for you.',
};

/* ============ MAP PINS ============
   Each pin: { coords, title, story, photo }
   - coords: [latitude, longitude] — get them by right-clicking in Google Maps;
             the first menu item is the coordinates.
   - photo:  optional photo shown in the popup. Leave '' for no photo.
*/
// Auto-built by clustering GPS-tagged photos to the nearest of Prassu's 35
// visited cities. 23 cities had matching photos; the other 12 are pinned
// without a representative photo. Edit any `story` to make it personal.
const PLACES = [
  // ── India ──
  { coords: [12.9716, 77.5946], title: 'Bengaluru, India',     story: 'Where it all started · 13 photos from here', photo: 'photos/journey/IMG_7767.jpg', date: 'July 2018' },
  { coords: [17.3850, 78.4867], title: 'Hyderabad, India',     story: '8 photos · first time here together: September 2018', photo: 'photos/journey/IMG_0352.jpg', date: 'September 2018' },
  { coords: [13.0827, 80.2707], title: 'Chennai, India',       story: '6 photos · first visit: November 2018', photo: 'photos/journey/IMG_4580.jpg', date: 'November 2018' },
  { coords: [11.9416, 79.8083], title: 'Puducherry, India',    story: '5 photos · first visit: April 2019', photo: 'photos/journey/IMG_7962.jpg', date: 'April 2019' },
  { coords: [19.0760, 72.8777], title: 'Mumbai, India',        story: '3 photos · first visit: November 2019', photo: 'photos/journey/IMG_7253.jpg', date: 'November 2019' },
  { coords: [18.7546, 73.4062], title: 'Lonavala, India',      story: 'November 2019', photo: 'photos/journey/IMG_7541.jpg', date: 'November 2019' },
  { coords: [10.2381, 77.4892], title: 'Kodaikanal, India',    story: '3 photos · first visit: December 2020', photo: 'photos/journey/IMG_1170.jpg', date: 'December 2020' },
  { coords: [21.2514, 81.6296], title: 'Raipur, India',        story: 'Home base · December 2024 onwards', photo: 'photos/journey/IMG_9857.jpg', date: 'December 2024' },
  // cities without GPS-matched photos
  { coords: [28.6139, 77.2090], title: 'Delhi, India',         story: 'Visited together — add a memory here.', photo: '' },
  { coords: [21.1842, 80.5481], title: 'Dongargaon, India',    story: 'Visited together — add a memory here.', photo: '' },
  { coords: [10.2719, 77.4011], title: 'Poombarai, India',     story: 'Hill village near Kodaikanal.', photo: '' },
  { coords: [12.6208, 80.1982], title: 'Mahabalipuram, India', story: 'Coastal day trip from Chennai.', photo: '' },
  { coords: [12.8528, 77.3893], title: 'Nettigere, India',     story: 'Visited together — add a memory here.', photo: '' },
  { coords: [12.9000, 77.5000], title: 'Eguvasobha, India',    story: 'Visited together — add a memory here.', photo: '' },

  // ── Türkiye ──
  { coords: [41.0082, 28.9784], title: 'Istanbul, Türkiye',    story: 'The Bosphorus, the bridge at night · August 2024', photo: 'photos/journey/IMG_7790.jpg', date: 'August 2024' },
  { coords: [38.6431, 34.8285], title: 'Göreme, Türkiye',      story: 'Cappadocia. The fairy chimneys, the balloons.', photo: 'photos/journey/IMG_8178.jpg', date: 'August 2024' },
  { coords: [38.7173, 34.8467], title: 'Avanos, Türkiye',      story: 'August 2024', photo: 'photos/journey/IMG_8560.JPG', date: 'August 2024' },
  { coords: [38.6307, 34.8060], title: 'Uçhisar, Türkiye',     story: 'Cappadocia stop — add a memory.', photo: '' },

  // ── Germany ──
  { coords: [53.0061, 13.1606], title: 'Gransee, Germany',     story: '9 photos · first visit: April 2025', photo: 'photos/journey/IMG_1460.jpg', date: 'April 2025' },
  { coords: [52.5200, 13.4050], title: 'Berlin, Germany',      story: '5 photos · first visit: May 2025', photo: 'photos/journey/IMG_3428.jpg', date: 'May 2025' },
  { coords: [49.3988,  8.6724], title: 'Heidelberg, Germany',  story: 'November 2025', photo: 'photos/journey/IMG_5497.jpg', date: 'November 2025' },
  { coords: [53.0833, 13.1167], title: 'Schönermark, Germany', story: 'Brandenburg countryside.', photo: '' },
  { coords: [53.1542, 13.0306], title: 'Stechlin, Germany',    story: 'The lake near Gransee.', photo: '' },

  // ── Austria / Czechia ──
  { coords: [48.2082, 16.3738], title: 'Vienna, Austria',      story: 'June 2025', photo: 'photos/journey/IMG_2354.jpg', date: 'June 2025' },
  { coords: [48.2278, 15.3331], title: 'Melk, Austria',        story: 'June 2025', photo: 'photos/journey/IMG_1899.jpg', date: 'June 2025' },
  { coords: [47.8095, 13.0550], title: 'Salzburg, Austria',    story: 'Visited together — add a memory.', photo: '' },
  { coords: [47.5622, 13.6493], title: 'Hallstatt, Austria',   story: 'Lake village, alpine views.', photo: '' },
  { coords: [50.0755, 14.4378], title: 'Prague, Czechia',      story: 'June 2025', photo: 'photos/journey/IMG_2923.jpg', date: 'June 2025' },

  // ── France ──
  { coords: [43.7102,  7.2620], title: 'Nice, France',         story: 'The Riviera · October 2025', photo: 'photos/journey/IMG_5115.jpg', date: 'October 2025' },
  { coords: [43.5528,  7.0174], title: 'Cannes, France',       story: 'October 2025', photo: 'photos/journey/IMG_5313.jpg', date: 'October 2025' },
  { coords: [48.8566,  2.3522], title: 'Paris, France',        story: 'January 2026', photo: 'photos/journey/IMG_6159.jpg', date: 'January 2026' },
  { coords: [48.8736,  2.7733], title: 'Chessy, France',       story: 'Disneyland · January 2026', photo: 'photos/journey/IMG_6328.jpg', date: 'January 2026' },

  // ── Netherlands / Denmark ──
  { coords: [52.4385,  4.8266], title: 'Zaandam, Netherlands', story: 'The windmills · February 2026', photo: 'photos/journey/IMG_6588.jpg', date: 'February 2026' },
  { coords: [52.3676,  4.9041], title: 'Amsterdam, Netherlands', story: 'Visited together — add a memory.', photo: '' },
  { coords: [55.6761, 12.5683], title: 'Copenhagen, Denmark',  story: 'March 2026', photo: 'photos/journey/IMG_6995.jpg', date: 'March 2026' },
];

/* ============ 30 REASONS ============
   Each reason: { text, photo }
   - text:  one sentence. Short hits hardest. Keep it tight.
   - photo: optional. If set, fills the top half of the card.
            Leave '' for a soft gradient (still looks pretty).
   The 30th one gets special "finale" styling.
*/
const REASONS = [
  { text: 'The way you laugh at your own jokes before the punchline lands.', photo: '' },
  { text: 'You remember the small thing I mentioned three weeks ago.', photo: '' },
  { text: 'Your handwriting on a grocery list still gets me.', photo: '' },
  { text: 'You make terrible coffee with confidence.', photo: '' },
  { text: 'You dance in the kitchen.', photo: '' },
  { text: 'You ask follow-up questions when other people would have stopped listening.', photo: '' },
  { text: 'You\'re kind to people who can do nothing for you.', photo: '' },
  { text: 'You are brave in ways that don\'t announce themselves.', photo: '' },
  { text: 'You sing along to songs you don\'t know the words to.', photo: '' },
  { text: 'You apologize first when you shouldn\'t have to.', photo: '' },
  { text: 'You read the menu out loud like a story.', photo: '' },
  { text: 'You forgive me faster than I deserve.', photo: '' },
  { text: 'You make rooms feel warmer.', photo: '' },
  { text: 'You take photos of food and I love that about you.', photo: '' },
  { text: 'You\'re funny in a way that sneaks up on people.', photo: '' },
  { text: 'You take care of plants like they have feelings.', photo: '' },
  { text: 'You cry at commercials.', photo: '' },
  { text: 'You drive like a maniac in parking lots and a saint on highways.', photo: '' },
  { text: 'You give the best birthday cards.', photo: '' },
  { text: 'You let me steal the blanket.', photo: '' },
  { text: 'You make the bed every morning and then we destroy it.', photo: '' },
  { text: 'You text your friends back. I want to be more like you.', photo: '' },
  { text: 'You\'re honest, even when it costs you.', photo: '' },
  { text: 'You can tell when something\'s wrong before I can.', photo: '' },
  { text: 'You believe in me on the days I forget how to.', photo: '' },
  { text: 'You make ordinary Tuesdays feel like something.', photo: '' },
  { text: 'You build people up.', photo: '' },
  { text: 'You\'re still surprising me after all this time.', photo: '' },
  { text: 'You\'re the most home I\'ve ever felt.', photo: '' },
  { text: 'You. Just you. All of it. Happy 30th, my love.', photo: '' }, // ← the finale
];

/* ============ QUIZ: "Do You Remember?" ============
   Multiple-choice trivia about the two of you.
   - q:        the question
   - options:  array of 2-4 answer strings
   - correct:  index (0-based) of the correct answer
   - reward:   one sentence shown on correct answer (sweet, in your voice)
   - photo:    optional photo path shown on correct answer
   Replace these placeholders with real ones. Leave QUIZ.questions = [] to hide the section.
*/
const QUIZ = {
  questions: [
    {
      q: 'Where did we first meet?',
      options: ['Phoenix Mall — Bengaluru', 'Wipro — Hyderabad', 'Jubilant — Bengaluru', 'IIT Madras campus'],
      correct: 2,
      reward: 'Jubilant. That elevator. That first hi. We never looked back.',
      photo: '',
    },
    {
      q: 'What\'s the song that\'s ours?',
      options: ['Vachindamma', 'Inkem Inkem Kavale', 'Samajavaragamana', 'Butta Bomma'],
      correct: 2,
      reward: 'Every time Sid Sriram sings it, I think of you.',
      photo: '',
    },
    {
      q: 'What do I call you?',
      options: ['Pinku', 'Buntu', 'Babe', 'Vinju'],
      correct: 3,
      reward: 'My Vinju. Always Vinju.',
      photo: '',
    },
    {
      q: 'Where did we go on our first trip together?',
      options: ['Coorg', 'Ooty', 'Kodaikanal', 'Munnar'],
      correct: 2,
      reward: 'Kodaikanal. The fog, the chai, you in that shawl.',
      photo: '',
    },
    {
      q: 'What\'s our running joke?',
      options: ['Ramesh — Suresh', 'Tom — Jerry', 'Anna — Akka', 'Munna — Circuit'],
      correct: 0,
      reward: 'Ramesh, Suresh. Always. You laugh every single time.',
      photo: '',
    },
  ],
  finale: (score, total) =>
    score === total
      ? 'Perfect. You know us. You always have.'
      : score >= Math.ceil(total * 0.6)
      ? 'Close enough. I love you for trying.'
      : 'It\'s okay — I\'ll keep reminding you. For the next sixty years.',
};

/* ============ HIDDEN HEARTS HUNT ============
   30 small pink hearts are scattered across every section.
   She finds them by exploring. Progress persists in her browser.
   When she collects all 30 — a special modal pops up with this message.
*/
const HIDDEN_HEARTS = {
  finaleTitle: 'You found them all.',
  finaleMessage: 'Thirty hearts for thirty years. The thirty-first is mine — and it\'s yours, always.',
};

/* ============ MEMORY MATCH GAME ============
   A 4x4 grid of card pairs. Pick 6 OR 8 photos that mean something to you both.
   Each photo appears twice (as a pair) — she flips cards to find matches.
   - photos: array of paths. 6 photos = 3x4 grid (12 cards). 8 photos = 4x4 grid (16 cards).
   - Leave the array empty to HIDE this section entirely.
   - The section reappears the moment you add photos.
   - Tip: pick photos with distinct moods/colors so pairs are findable but not trivial.
*/
const MEMORY_MATCH = {
  photos: [
    // 'photos/match-01.jpg',
    // 'photos/match-02.jpg',
    // 'photos/match-03.jpg',
    // 'photos/match-04.jpg',
    // 'photos/match-05.jpg',
    // 'photos/match-06.jpg',
    // 'photos/match-07.jpg',
    // 'photos/match-08.jpg',
  ],
  winMessage: 'You found all the moments. Just like you find me.',
};

/* ============ 30 WISHES FOR YOUR 30s ============
   Looking-forward companion to the 30 Reasons.
   Same card mechanic. Last one is the finale.
*/
const WISHES = [
  'May this decade be the loudest yet.',
  'May you ask for more, and get it.',
  'May you keep dancing in the kitchen.',
  'May your courage outgrow your worry.',
  'May the world finally see what I see.',
  'May you fall in love with yourself the way I have.',
  'May we travel to ten more places we\'ve never heard of.',
  'May you trust your gut, every time.',
  'May you let the small things slide.',
  'May your laugh stay this loud, forever.',
  'May every Tuesday feel like Friday.',
  'May you take up more space.',
  'May you say no when you mean no.',
  'May your work bring you joy, not just pay.',
  'May we cook badly and eat happily.',
  'May you sleep in on Sundays without guilt.',
  'May the people who love you tell you more often.',
  'May you outgrow the things that hurt you.',
  'May we laugh until our jaws ache.',
  'May you keep surprising me.',
  'May you stop apologizing for being yourself.',
  'May your friendships deepen.',
  'May we adopt that dog.',
  'May we keep choosing each other, daily.',
  'May you forgive yourself the way you forgive me.',
  'May every chai be perfect.',
  'May we keep our weirdness, all of it.',
  'May your dreams scale up, not down.',
  'May the rest of our years be even better than these.',
  'May I get to love you for fifty more decades. ♡',
];
const WISHES_FINALE = 'And that\'s only thirty. I have a lifetime more.';

/* ============ STATS BANNER ============
   Small strip shown above the letter. Numbers are computed at runtime from
   JOURNEY_PHOTOS + PLACES, so they stay accurate if you add/remove content.
   Override any value below to hardcode it.
*/
const STATS = {
  years: 8,          // years together
  // photos: 82,     // auto-calculated from journey-manifest.js
  // places: 35,     // auto-calculated from PLACES.length
  memoriesLabel: '∞',
  caption: 'and counting',
};

/* ============ THE LETTER ============
   The long letter. Use \n\n between paragraphs.
*/
const LETTER = `My love,

I keep starting this letter and stopping. Thirty years of you in the world and ten of them with me, and somehow every sentence feels too small.

So here's the truth, in no particular order:

You changed what I think a life is for. Before you, I had ambitions; with you, I have a home. Before you, I had plans; with you, I have mornings I never want to leave.

I notice you. The little crease above your eyebrow when you're reading something you disagree with. The way your voice drops a half-step when you're telling the truth. The face you make when something tastes better than you expected. I've been collecting these for years and I'm nowhere close to done.

You taught me what tenderness looks like up close. Not the dramatic kind — the quiet, daily kind. The made-for-me cup of chai, the saved-for-me last piece. The dozens of small choosings that add up to "I love you" without anyone ever having to say it.

I hope your thirties are loud and gentle and unhurried. I hope you take up more space. I hope you trust yourself even more. I hope we keep getting better at this.

If I had to do it all again — every wrong turn, every long week, every nothing-day — I'd do it the exact same way, as long as it ended with you.

Happy 30th, my best person.

I love you. I love you. I love you.`;

const LETTER_SIGNOFF = 'Yours, always —';
