# 🚀 React Portfolio — Modern, Data-Driven CV Site

A sleek, modern portfolio website built with **React + TypeScript + Vite**. Designed for job seekers — fully customizable by editing JSON files. No coding required to personalize it.

---

## ✨ Features

- **Dark glassmorphism design** with gradient accents and smooth animations
- **Typing tagline effect** cycling through your role titles
- **"Open to opportunities" badge** to signal availability to recruiters
- **Download CV button** in both the navbar and hero section
- **Featured project highlight** with a dedicated badge
- **Vertical timeline** for work experience and volunteering
- **Technical skills grid** with icon cards
- **Scroll-reveal animations** throughout all sections
- **Fully responsive** — looks great on desktop, tablet, and mobile
- **SEO optimized** with Open Graph tags for LinkedIn sharing

---

## 🏁 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/shalev5252/react-profolio.git
cd react-profolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

---

## 🎨 Customization Guide

All personal content is controlled by **JSON files** in the `src/data/` directory and **assets** in the `public/assets/` directory. Edit these to make the site yours — no code changes needed.

### 📁 File Structure

```
src/data/
├── user.json            # Your personal info, contact, skills
├── history.json         # Work experience entries
├── volenteering.json    # Volunteering entries
├── projects.json        # Project cards
├── skills.json          # Technical skill icons
└── descriptions/        # Detailed project descriptions (markdown)
    ├── calendaragent.txt
    └── killerPool.txt

public/
├── resume.pdf           # Your CV file (gitignored)
└── assets/
    ├── hero/            # Hero section avatar image
    ├── photo/           # Professional photo (gitignored)
    ├── about/           # About section images & icons
    ├── skills/          # Technical skill icon PNGs
    ├── projects/        # Project logos, screenshots, GIFs
    ├── history/         # Organization logos (IDF, Technion, etc.)
    ├── contact/         # Contact method icons
    └── nav/             # Navigation icons (legacy, not used)
```

---

### 1️⃣ `user.json` — Your Personal Info

This is the main file. It controls the hero, about, skills, and contact sections.

| Field | Type | Description |
|-------|------|-------------|
| `firstName` | string | Your first name (shown in hero greeting) |
| `lastName` | string | Your last name (shown in footer copyright) |
| `taglines` | string[] | Role titles that cycle in the typing animation (e.g., `["Backend Developer", "Full-Stack Engineer"]`) |
| `description` | string | Short professional summary shown in hero and about sections |
| `openToWork` | boolean | Set to `true` to show the green "Open to opportunities" badge |
| `heroImage` | string | Path to your avatar image in `public/assets/` |
| `heroImageUrl` | boolean | Set to `true` if `heroImage` is a full URL instead of a local path |
| `profilePhoto` | string | Path to a professional photo (optional, in `public/assets/photo/`) |
| `aboutSkills` | array | Your top 3 professional strengths (title, description, icon) |
| `email` | string | Your email (used for "Contact Me" button) |
| `contact` | array | Contact methods shown in the footer (email, LinkedIn, GitHub, phone) |
| `skills` | string[] | Soft skills shown as pills in the Skills section |
| `languages` | string[] | Languages you speak, shown as pills |
| `stats` | object | Key metrics: `yearsExperience`, `projectsBuilt`, `technologies`, `languagesSpoken` |

**Example `aboutSkills` entry:**
```json
{
  "title": "Backend Development",
  "description": "Building scalable APIs and microservices with Python and FastAPI",
  "skillImage": "about/serverIcon.png",
  "skillImageUrl": false,
  "skillImageAlt": "Server icon"
}
```

**Example `contact` entry:**
```json
{
  "contactMethodIcon": "contact/emailIcon.png",
  "contactMethodIconUrl": false,
  "contactMethodLink": "mailto:you@example.com",
  "contactMethodAlt": "Email icon",
  "contactMethodText": "you@example.com"
}
```

---

### 2️⃣ `history.json` — Work Experience

An array of work experience entries displayed as a vertical timeline.

| Field | Type | Description |
|-------|------|-------------|
| `role` | string | Your job title |
| `organisation` | string | Company or organization name |
| `startDate` | string | Start date (e.g., `"Oct, 2024"`) |
| `endDate` | string | End date (e.g., `"Dec, 2025"` or `"Present"`) |
| `experiences` | string[] | Bullet points describing what you did |
| `imageSrc` | string | Path to company logo in `public/assets/` |
| `imageSrcUrl` | boolean | Set to `true` if `imageSrc` is a full URL |

**Example:**
```json
{
  "role": "Software Engineer",
  "organisation": "Google",
  "startDate": "Jan, 2024",
  "endDate": "Present",
  "experiences": [
    "Built scalable microservices serving 1M+ users",
    "Led a team of 5 engineers on a critical project"
  ],
  "imageSrc": "history/google.png",
  "imageSrcUrl": false
}
```

---

### 3️⃣ `volenteering.json` — Volunteering

Same structure as `history.json`. Displayed in a separate timeline section.

---

### 4️⃣ `projects.json` — Your Projects

An array of project cards. One can be marked as `featured` for a prominent display.

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Project name |
| `imageSrc` | string | Path to project logo/screenshot |
| `imageSrcUrl` | boolean | Set to `true` if image is a URL |
| `description` | string | Short description (shown on card) |
| `detailedDescription` | string | (Optional) Path to a `.txt` file in `src/data/descriptions/` for a longer write-up |
| `skills` | string[] | Technologies used (shown as tags) |
| `demo` | string | URL to live demo, or `"none"` to hide the button |
| `source` | string | URL to GitHub repo |
| `app` | boolean | Whether this is a mobile app (affects detail page layout) |
| `featured` | boolean | (Optional) Set to `true` to highlight this project |
| `media` | string[] | (Optional) Array of image/GIF/video paths for the detail page carousel |

**Example:**
```json
{
  "title": "My Cool App",
  "imageSrc": "projects/my_app_logo.png",
  "imageSrcUrl": false,
  "description": "An app that does amazing things.",
  "skills": ["React", "Node.js", "PostgreSQL"],
  "demo": "https://my-app.com",
  "source": "https://github.com/user/my-app",
  "app": false,
  "featured": true
}
```

---

### 5️⃣ `skills.json` — Technical Skills Icons

An array of technical skills displayed as an icon grid in the Experience section.

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Skill name (e.g., `"Python"`) |
| `imageSrc` | string | Path to skill icon PNG in `public/assets/skills/` |
| `imageSrcUrl` | boolean | Set to `true` if image is a URL |

**To add a new skill:** Place a PNG icon (ideally 48×48px or larger) in `public/assets/skills/` and add an entry to the JSON.

---

### 6️⃣ Resume / CV File

Place your resume PDF at:
```
public/resume.pdf
```

The "Download CV" buttons in the navbar and hero will link to it. This file is **gitignored** by default so it stays private.

---

### 7️⃣ Profile Photo

To add a professional photo, place it at:
```
public/assets/photo/profile.jpg
```

This directory is **gitignored** so the image won't be pushed to GitHub.

---

## 🎛️ Advanced Customization

### Changing Colors
Edit `src/vars.css` to change the entire color scheme. Key variables:
```css
--color-bg: #0a0f1c;           /* Page background */
--color-primary: #6366f1;       /* Accent color (indigo) */
--color-accent: #06b6d4;        /* Secondary accent (cyan) */
--color-text: #f1f5f9;          /* Main text color */
```

### Changing Section Order
Edit `src/App.tsx` to reorder, add, or remove sections:
```tsx
<NavBar />
<Hero />
<About />
<Skills />
<Experience />
<Projects />
<Contact />
```

### Adding Project Detail Pages
1. Create a `.txt` file in `src/data/descriptions/` (supports Markdown)
2. Reference it in `projects.json` via the `detailedDescription` field
3. Add GIFs/images to `public/assets/projects/` and list them in the `media` array

---

## 🏗️ Build & Deploy

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

The build output goes to `dist/`. Deploy it to any static hosting:
- **Netlify** — drag & drop the `dist/` folder or connect via Git
- **Vercel** — import the repo and it auto-detects Vite
- **GitHub Pages** — use the `dist/` folder

---

## 🛠️ Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Fast dev server & bundler
- **CSS Modules** — Scoped, modular styling
- **Marked** — Markdown rendering for project descriptions

---

## 📝 Credits

Based on the concept from [CodeCompleteYT/react-portfolio](https://github.com/CodeCompleteYT/react-portfolio), redesigned with a modern glassmorphism aesthetic and data-driven architecture.

---

## 📄 License

Feel free to fork, customize, and use for your own portfolio!
