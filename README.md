# ResumeCraft — Resume Builder

A modern, responsive resume builder built with **React + Vite**. Create professional resumes with live preview, multiple templates, PDF export, and localStorage persistence.

## Features

- **Home page** with hero section and feature cards
- **Resume Builder** with sections for Personal Info (incl. photo upload), Education, Experience, Skills, Projects, and Certifications
- **Live resume preview** that updates as you type
- **3 templates**: Modern, Professional, Minimal (switching updates instantly)
- **Actions**: Download as PDF (jsPDF + html2canvas), Save, Print, Clear
- **Dashboard** to view, edit, delete saved resumes (persisted in localStorage)
- **Dark / Light mode**, completion progress bar, form validation, error messages, success toasts, auto-save, and character counter
- Fully responsive (mobile / tablet / desktop)

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

## Tech Stack

- React 19 (functional components + Hooks, Context API)
- Vite
- React Router DOM
- Local Storage (auto-save + saved resumes)
- jsPDF + html2canvas (PDF export)
- lucide-react (icons)

## Project Structure

```
src/
├── components/   Navbar, Sidebar, ResumePreview, form components, TemplateSelector
├── pages/        Home, ResumeBuilder, Dashboard, NotFound
├── templates/    ModernTemplate, ProfessionalTemplate, MinimalTemplate
├── context/      ResumeContext (global state via Context API)
├── utils/        localStorage helpers, sample data
├── App.jsx
├── main.jsx
└── index.css
```