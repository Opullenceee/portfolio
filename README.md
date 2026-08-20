<div align="center">

<img src="character.png" width="140" alt="Portfolio pixel character" />

# Izza Usman — Portfolio

**A personal developer portfolio built while learning Computer Science, software development, and AI.**

[![Made with HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](#)
[![Made with CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](#)
[![Made with JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](#)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](#)

</div>

---

## Overview

This repository contains the source code for my personal portfolio — a single-page, interactive site that showcases my skills, projects, education, and live GitHub activity.

Rather than being a static resume, it combines:

- Frontend development with animation-heavy UI
- Data visualization (skills radar + GitHub language stats)
- Live GitHub API integration
- A serverless backend that keeps my GitHub token private
- Responsive design across devices

I'm a Grade 11 ICS student building toward Computer Science, AI, and software development — this portfolio is both a showcase and a learning project, and it will keep evolving.

---

## Live Preview

> Add your deployed link here once live, e.g. `https://izzausman.vercel.app`

---

## Table of Contents

- [Portfolio Sections](#portfolio-sections)
- [Tech Stack](#tech-stack)
- [Why a Serverless Backend?](#why-a-serverless-backend)
- [GitHub Integration](#github-integration)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Configuration for Forks](#configuration-for-forks)
- [Roadmap](#roadmap)
- [Contact](#contact)
- [License](#license)

---

## Portfolio Sections

| Section | Description |
|---|---|
| **Hero / Introduction** | Animated intro with Typed.js role text and a Three.js particle canvas |
| **About Me** | Background, interests, and story |
| **Technical Skills** | Interactive Chart.js radar visualization |
| **Featured Projects** | Cards with descriptions, tech tags, and links |
| **Education Timeline** | Academic journey |
| **Live GitHub Stats** | Followers, following, gists, and repo counts (live) |
| **GitHub Language Analytics** | Chart.js breakdown of most-used languages |
| **Recent GitHub Activity** | Live feed of recent public GitHub events |
| **Contact Form** | EmailJS-powered, no custom backend required |
| **Responsive Interface** | Adapts across desktop, tablet, and mobile |

---

## Tech Stack

**Frontend**
- **HTML5** — semantic structure
- **CSS3** — layout, responsive design, transitions, visual effects
- **Vanilla JavaScript** — app logic, DOM manipulation, API handling, interactivity

**Animation & Visualization**
- **[GSAP](https://greensock.com/gsap/)** + **ScrollTrigger** — advanced, scroll-based animation
- **[AOS](https://michalsnik.github.io/aos/)** — scroll-reveal entrance animations
- **[Three.js](https://threejs.org/)** — interactive particle canvas in the hero section
- **[Typed.js](https://github.com/mattboldt/typed.js/)** — animated typing effects
- **[Chart.js](https://www.chartjs.org/)** — skills radar and GitHub language charts

**Integrations & Infra**
- **[EmailJS](https://www.emailjs.com/)** — contact form delivery, no backend needed
- **[Vercel](https://vercel.com/)** — serverless function hosting, environment variables, deployment
- **GitHub REST API** — live profile, repository, and activity data

All frontend libraries are loaded via CDN in `index.html` — no build step or `npm install` required for the frontend.

---

## Why a Serverless Backend?

The portfolio pulls **live data from the GitHub REST API**. Authenticated GitHub requests require a **private token**, and that token must never live in browser-accessible code.

To solve this, GitHub requests are routed through a **Vercel Serverless Function**:

```
API/
└── github.js
```

The token is stored securely as a Vercel environment variable (`GITHUB_TOKEN`) and is only ever read **server-side**, via `process.env.GITHUB_TOKEN`. It is never written into `index.html`, `script.js`, `style.css`, or committed to the repo.

**Request flow:**

```
Browser (Portfolio UI)
        │  request GitHub data
        ▼
Vercel Serverless Function (API/github.js)
        │  uses private GITHUB_TOKEN
        ▼
GitHub REST API
        │  profile / repos / public events
        ▼
Vercel Serverless Function
        │  combined JSON response
        ▼
script.js  →  updates the Live GitHub section
```

---

## GitHub Integration

The function requests three datasets for the account `opullenceee` and merges them into one JSON response:

| Endpoint | Data Retrieved |
|---|---|
| `GET /users/opullenceee` | Profile information |
| `GET /users/opullenceee/repos?sort=updated&per_page=100` | Repositories, sorted by most recently updated |
| `GET /users/opullenceee/events/public?per_page=8` | Recent public activity |

**Combined response shape:**

```json
{
  "user": {},
  "repos": [],
  "events": []
}
```

`script.js` consumes this response to populate GitHub stats, the language chart, the repo list, and the recent activity feed.

**`API/github.js`:**
- Authenticates with `GITHUB_TOKEN`
- Fetches profile, repos, and public events in parallel
- Combines the results into a single JSON payload
- Returns a `500` with an error message if any request fails

---

## Project Structure

```
portfolio/
│
├── API/
│   └── github.js        → Vercel serverless function for GitHub API requests
│
├── .hintrc               → Web development / linting configuration
├── character.png         → Portfolio pixel-art character asset
├── index.html             → Main page markup and structure
├── script.js               → Frontend logic, animations, GitHub data handling, charts, contact form
├── style.css                → Styling, layout, animations, responsive design
└── README.md                 → Project documentation
```

---

## Getting Started

### Prerequisites
- A modern browser
- [Node.js](https://nodejs.org/) (for running the Vercel CLI, if testing the API locally)
- A GitHub [Personal Access Token](https://github.com/settings/tokens) (for local API testing)

### Running the Frontend Locally

Since the site talks to an API, it should be served through a local server rather than opened directly as a `file://` URL.

```bash
# Python
python3 -m http.server 8000

# or Node.js
npx serve .
```

Then open **http://localhost:8000**.

### Running the API Locally

To test the GitHub integration end-to-end, use the [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm i -g vercel
vercel dev
```

Make sure `GITHUB_TOKEN` is available in your local environment (see below).

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GITHUB_TOKEN` | ✅ | GitHub personal access token used server-side by `API/github.js` to authenticate requests to the GitHub REST API |

Create a `.env` file locally (already gitignored) or set it via:

```bash
vercel env add GITHUB_TOKEN
```

⚠️ **Never commit your actual token.** It should only ever exist as an environment variable, both locally and in production.

---

## Deployment

**Backend (Vercel)**
The serverless API in `API/github.js` deploys automatically as a Vercel Function. Configure `GITHUB_TOKEN` in your Vercel project's Environment Variables before deploying to production.

**Frontend**
The static frontend can be hosted on:
- Vercel
- GitHub Pages
- Netlify
- Any static hosting provider

The frontend simply needs to point at your deployed `/API/github.js` endpoint to fetch live GitHub data.

---

## Configuration for Forks

If you fork this project, update the following:

| What | Where |
|---|---|
| **GitHub username** | Update `opullenceee` in `API/github.js` and any related frontend references |
| **GITHUB_TOKEN** | Set your own token via Vercel Environment Variables |
| **EmailJS credentials** | Replace the Public Key, Service ID, and Template ID in `script.js` with your own EmailJS account details |
| **Assets** | Confirm asset paths (like `character.png`) match their references in `index.html` / `style.css` |

---

## Development Notes

- Live GitHub data depends on GitHub REST API availability and rate limits.
- The GitHub token is intentionally kept server-side and is never exposed to the client.
- Third-party libraries are loaded via CDN; Google Fonts are loaded externally.
- The contact form depends on an active EmailJS service configuration.
- This is an evolving project — expect ongoing changes as new skills and projects are added.

---

## Roadmap

- [ ] Expand project case studies with more detail
- [ ] Add more in-depth project demos
- [ ] Improve accessibility
- [ ] Continue refining responsive layouts
- [ ] Expand GitHub analytics
- [ ] Improve performance and loading behavior
- [ ] Add new projects and experiments
- [ ] Continue polishing the overall visual experience

---

## Contact

| Platform | Handle |
|---|---|
| **Email** | idkitsizza@gmail.com |
| **GitHub** | [@opullenceee](https://github.com/opullenceee) |
| **LinkedIn** | [Opullencee](https://linkedin.com/in/Opullencee) |
| **Instagram** | [@opullenceee](https://instagram.com/opullenceee) |

---

## Collaboration

This is primarily a personal portfolio, but constructive feedback is welcome:

1. Open an issue describing the bug or suggestion.
2. Fork the repository.
3. Create a focused branch for your change.
4. Make and test your changes.
5. Submit a pull request with a clear explanation.

Please keep contributions consistent with the project's existing architecture and code style.

---

## License

This project is licensed under the MIT License. Add a `LICENSE` file to the repo root if one isn't present yet.

<div align="center">

**Built by Izza Usman**

*Learning • Building • Experimenting • Improving*

</div>
