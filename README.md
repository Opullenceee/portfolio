# Izza Usman — Portfolio

Personal portfolio site for Izza Usman, a Grade 11 ICS student building toward Computer Science / AI. Single-page site: hero, about, skills, projects, education timeline, live GitHub stats, and a contact form.

**Live demo:** https://opullenceee.github.io/ *(update with actual repo pages URL)*

## Stack

- HTML, CSS, vanilla JavaScript — no build step
- [GSAP](https://gsap.com/) + ScrollTrigger — scroll animations
- [AOS](https://michalsnik.github.io/aos/) — fade/scroll reveal effects
- [Three.js](https://threejs.org/) (r128) — hero particle canvas
- [Typed.js](https://github.com/mattboldt/typed.js/) — typed role text in hero
- [Chart.js](https://www.chartjs.org/) — skills radar + GitHub language chart
- [EmailJS](https://www.emailjs.com/) — sends the contact form without a backend
- GitHub REST API — powers the live "GitHub" stats section

All libraries are loaded via CDN in `index.html`, so there's nothing to install.

## Project structure

```
.
├── index.html    # page markup
├── style.css     # all styling
├── script.js     # animations, GitHub API fetch, contact form logic
└── _hintrc       # editor/linting config
```

## Running locally

No build tools needed — just serve the folder statically (opening `index.html` directly can break the module-style fetches/CORS for GitHub API calls, so use a local server):

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then open `http://localhost:8000`.

## Configuration

A few values are hardcoded and worth knowing about if you fork this:

- **GitHub username** — the GitHub section fetches data for `opullenceee`. Change the username in `index.html` (`#ghUsername`) and wherever `script.js` builds the GitHub API request.
- **EmailJS keys** — the contact form uses an EmailJS public key, service ID, and template ID set directly in `script.js`. Swap these for your own EmailJS account credentials if you fork this.
- **Character/hero image** — `index.html` expects an image at `assets/character.png` for the hero illustration; add that file or update the `src`.

## Notes

- The GitHub Profile Analyzer project card links to a live demo that isn't wired up yet (`href="#"` placeholder) — fill in once that project has its own hosted page.
- Fonts (Fraunces, Space Grotesk, DM Sans) are pulled from Google Fonts.

## Contact

- Email: idkitsizza@gmail.com
- GitHub: [@opullenceee](https://github.com/opullenceee)
- LinkedIn: [Opullencee](https://linkedin.com/in/opullencee)
- Instagram: [@opullencee](https://instagram.com/opullencee)
