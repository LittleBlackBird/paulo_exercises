# Paulo's Exercises 🚀

A small, friendly practice app for a 9-year-old: daily math practice, an
emotions journal in three languages, and a music ear-training game — all
wrapped in a points-and-streaks "quest" that makes studying feel like a game.

Everything runs in the browser. There is no account, no server, and no data
ever leaves the computer (progress is saved in the browser's local storage).

---

## How it works (the rules)

- **The goal is 500 points.** Each finished **study session** is worth **50
  points**, so 500 points = **10 study sessions**.
- **A study session = 8 math exercises + the Practice Area checklist.** Both
  must be completed for the session to count.
- **One session per day (by default).** This makes the journey to 500 mean
  *10 real study days*, and it builds a daily **streak** 🔥. Grown-ups can turn
  this limit off in the **Grown-ups panel** (on the Practice Area page).
- **Nothing is ever lost.** Every answer and every checkbox is saved the moment
  it happens. Paulo can stop in the middle, close the browser, and pick up
  exactly where he left off.

### The 8 math exercises
Every session always includes **one concept question** (multiple choice) and
**one division with decimals**, plus six more picked at random from: division,
decimal +/−/×, linear equations, geometry, prime numbers, factors, sets,
inequalities, measures, probability, reading tables, and reading graphics.

### Learning help (built in)
- After **2 wrong tries**, a **hint** appears (it nudges toward the method
  without giving the answer).
- After **3 wrong tries**, a **worked solution** appears and the question is
  marked **"learned with help."** It still counts toward finishing the session,
  but it's tracked separately so you can see where Paulo needed support.

### For grown-ups
Open the **Practice Area** page and scroll to the **Grown-ups** panel. There you
can:
- See **per-topic accuracy** (weakest topics listed first).
- See the current **study streak** and total study days.
- **Back up / export** all progress to a small `.json` file, and **import** it
  again later or on another computer.
- Toggle the **one-session-per-day** limit.
- **Print a certificate** once Paulo reaches 500 points (it also pops up
  automatically the moment he gets there 🏆).

### Music game
- **Phase 1:** hear one note, guess it.
- **Phase 2** (unlocks after Phase 1): hear **two notes in a row** and guess
  both, in order.
- **"Hear it again" 🔁** replays the notes, but using it means that round
  won't score a point.

---

## How to run it

The app loads a couple of small files (the navigation bar) using `fetch`, which
browsers block when you open the pages directly as `file://...`. So it needs to
be served over a simple local web server. Two easy options:

### Option A — run it locally (nothing installed but Python)

Most computers already have Python. In a terminal, from **inside this folder**:

```bash
# Python 3
python3 -m http.server 8000
```

Then open **http://localhost:8000/** in your browser. To stop it, press
`Ctrl + C`.

(If you have Node.js instead: `npx serve` from this folder also works.)

### Option B — host it for free with GitHub Pages

1. Create a free GitHub account and a new repository.
2. Upload all the files in this folder to the repository.
3. In the repository, go to **Settings → Pages**, choose the `main` branch and
   the root folder, and save.
4. After a minute, GitHub gives you a public link like
   `https://yourname.github.io/your-repo/` that works on any device.

---

## Files (quick tour)

| File / folder            | What it is                                             |
| ------------------------ | ------------------------------------------------------ |
| `index.html`             | Home — the points quest and reminders                  |
| `math_practice.html`     | The 8-exercise math quiz                               |
| `practice.html`          | The daily checklist **and** the Grown-ups panel        |
| `feelings.html`          | Feeling of the day + journal (English / Português / Español) |
| `feelings-history.html`  | Saved journal entries                                  |
| `music_game.html`        | The ear-training game (Phase 1 & 2)                    |
| `css/style.css`          | The look and feel                                      |
| `js/`                    | All the app logic (see comments at the top of each file) |
| `js/quiz.js`             | The math generator (converted from `python/quiz.py`)   |
| `python/quiz.py`         | The original Python version, kept for reference only   |
| `assets/videos/`         | Reward videos shown when the checklist is finished     |

---

## Resetting

To start over from zero, use **Back up / export** first if you want to keep the
current progress, then clear the site's data in your browser settings (or use
the certificate/parent tools). Importing a backup file restores everything.
