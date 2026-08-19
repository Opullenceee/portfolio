# Izza Usman — Portfolio

A personal developer portfolio showcasing my journey in Computer Science, software development, and AI-focused projects.


# Overview

This repository contains the source code for my personal portfolio website — a single-page, interactive portfolio built to showcase my skills, projects, education, development journey, and GitHub activity.

Rather than functioning as a simple static resume, the portfolio combines frontend development, animation, data visualization, API integration, and a secure serverless backend to create a dynamic experience.

I am a Grade 11 ICS student building toward a future in Computer Science, Artificial Intelligence, and software development, with a focus on learning through meaningful, practical projects.

# Portfolio Sections

* Hero / introduction
* About me
* Technical skills
* Featured projects
* Education timeline
* Live GitHub statistics
* GitHub language analytics
* Recent GitHub activity
* Contact form
* Responsive interface


# Tech Stack

Technology	Purpose
HTML5	Semantic page structure and content
CSS3	Layout, responsive design, styling, and visual effects
Vanilla JavaScript	Application logic, interaction, API communication, and DOM updates
GSAP	Advanced animations
ScrollTrigger	Scroll-based animation control
AOS	Scroll reveal and entrance animations
Three.js	Interactive hero particle canvas
Typed.js	Animated text in the hero section
Chart.js	Skills radar and GitHub language visualization
EmailJS	Contact form delivery without a traditional backend
Vercel	Serverless backend and deployment
GitHub REST API	Live GitHub profile, repository, and activity data

All frontend libraries are loaded through CDN links in index.html, so no frontend dependency installation or build step is required.


# Why Vercel?

The GitHub API requires authentication for the requests used by this portfolio. Instead of exposing the GitHub token inside browser-accessible JavaScript, the token is stored as a private Vercel environment variable.

# The serverless function:

1. Receives a request from the portfolio.
2. Reads the private GITHUB_TOKEN environment variable.
3. Authenticates with the GitHub REST API.
4. Retrieves the required GitHub data.
5. Returns the data to the frontend as JSON.

This keeps the authentication credential out of the publicly accessible frontend source code.


# GitHub Integration

The portfolio retrieves live data for the GitHub account opullenceee.

The serverless function requests three datasets:

GitHub Endpoint	Information
/users/opullenceee	Profile information
/users/opullenceee/repos	Repositories, sorted by recently updated
/users/opullenceee/events/public	Recent public GitHub activity

These responses are combined into a single JSON response containing:

{
  "user": {},
  "repos": [],
  "events": []
}

The frontend then uses this data to populate the GitHub section dynamically.

# API File

API/
└── GitHub.js

The function uses the following environment variable:

GITHUB_TOKEN

The actual value is not stored in the repository.


# Security

A key part of the project’s architecture is keeping the GitHub authentication token private.

The token is accessed server-side through:

process.env.GITHUB_TOKEN

rather than being written directly into script.js, index.html, or another frontend-accessible file.

# Request flow

Browser
   │
   │  Request
   ▼
Vercel Function
   │
   │  Private GITHUB_TOKEN
   ▼
GitHub API
   │
   │  Data
   ▼
Vercel Function
   │
   │  JSON
   ▼
Browser

This separation allows the portfolio to display live GitHub information while keeping the authentication credential outside the client-side code.

Never commit the actual GITHUB_TOKEN value to Git or expose it in frontend source files.


# ✨ Project Structure

portfolio/
│
├── API/
│   └── GitHub.js          # Vercel serverless GitHub API function
│
├── .hintrc                # Web development / linting configuration
├── corrector.png          # Portfolio asset
├── index.html             # Main portfolio page
├── README.md              # Project documentation
├── script.js              # Frontend logic, animations, API & form handling
├── style.css              # Portfolio styling and responsive layouts
└── LICENSE                # MIT License


# Features

# Interactive Hero

A visually animated introduction combining typography, motion, and a Three.js particle canvas.

# Skills Visualization

Technical skills are represented through interactive Chart.js visualizations rather than only being presented as text.

# Project Showcase

Featured projects are presented with descriptions, technologies, and links to demonstrate practical development work.

# Live GitHub Dashboard

GitHub information is fetched dynamically through the Vercel serverless API, allowing the portfolio to display current:

* Profile information
* Repository data
* Language statistics
* Recent public activity
* GitHub-related metrics

# Animation System

Multiple animation tools work together to create a polished scrolling experience:

* GSAP
* ScrollTrigger
* AOS
* Typed.js
* Three.js

# Contact Form

EmailJS handles contact form delivery without requiring a traditional custom backend for sending messages.

# Responsive Design

The interface is designed to adapt across desktop, tablet, and mobile screen sizes.


# ✨ Tools Used

Tool	Purpose
VS Code	Development environment
Git	Version control
GitHub	Source control and repository hosting
Vercel	Serverless API hosting and deployment
GitHub Pages	Static frontend hosting, where applicable
Figma	Interface and design planning
Canva	Supporting visual assets


# Running Locally

No frontend build system is required.

Because the portfolio communicates with an API, it should be served through a local development server rather than opened directly with file://.

Python

python3 -m http.server 8000

Node.js

npx serve .

# Then open:

http://localhost:8000

Running the Vercel API locally

If you want to test the serverless GitHub integration locally, use the Vercel CLI and configure the required environment variable:

vercel dev

The GITHUB_TOKEN should be configured as an environment variable and must not be committed to the repository.


# Configuration

If you fork this project, several values should be updated.

# GitHub Username

The current portfolio is configured for:

opullenceee

Update the username in the relevant frontend and API configuration if you want the GitHub section to represent another account.

# GitHub Token

The backend expects:

GITHUB_TOKEN

Configure this through Vercel’s environment variables.

Do not replace it with the actual token inside GitHub.js.

EmailJS

# The contact form uses:

* Public key
* Service ID
* Template ID

Replace the existing configuration with your own EmailJS credentials if you fork the project.

# Assets

Make sure all referenced assets exist at their expected paths. If an asset is moved, update its corresponding reference in the HTML or CSS.


# Deployment

The project can be deployed using a combination of static hosting and Vercel’s serverless infrastructure.

# Vercel

Vercel hosts the serverless API responsible for securely communicating with GitHub.

The production deployment should have the following environment variable configured:

GITHUB_TOKEN

# Frontend

The frontend can be deployed through a static hosting provider such as GitHub Pages, Vercel, Netlify, or another compatible platform.

The frontend communicates with the deployed Vercel API endpoint to retrieve GitHub data.


# Development Notes

* GitHub data depends on the availability and response of the GitHub REST API.
* The GitHub authentication token is intentionally kept server-side.
* Third-party frontend libraries are loaded through CDNs.
* Google Fonts are loaded externally.
* The contact form depends on the configured EmailJS service.
* The GitHub Profile Analyzer project may contain a placeholder link until its dedicated deployment is available.
* The portfolio is an evolving project and will continue to change as new skills and projects are added.


# Roadmap

The portfolio will continue evolving alongside my development journey.

* Expand project case studies
* Add more detailed project demonstrations
* Improve accessibility
* Continue refining responsive layouts
* Expand GitHub analytics
* Improve performance and loading behavior
* Add new projects and experiments
* Continue improving the visual experience


# Contact

If you’d like to connect, explore my projects, or follow my development journey:

Platform	Link
Email	idkitsizza@gmail.com
GitHub	@opullenceee⁠￼
LinkedIn	Opullencee⁠￼
Instagram	@opullencee⁠￼


# 🤝 Collaboration

This is primarily a personal portfolio project, but constructive feedback and meaningful contributions are welcome.

If you find a bug or have an improvement in mind:

1. Open an issue describing the problem or suggestion.
2. Fork the repository.
3. Create a focused branch for your changes.
4. Make and test your changes.
5. Submit a pull request with a clear explanation.

Please keep contributions consistent with the project’s existing architecture, design, and code quality.


# License

This project is licensed under the MIT License.

See LICENSE⁠￼ for the complete license text.

<div align="center">

# Built by Izza Usman

Learning. Building. Experimenting. Improving.

</div>
