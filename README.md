<div align="center">

# 💪 FitLog

### Workout Library & Daily Training Planner

A dark, no-nonsense gym companion — pick a lift, lock it into today's plan, and watch the week's work add up.

[**🔗 Live Site**](https://fit-log-eta-six.vercel.app/) · [**📂 Repository**](https://github.com/charsamia27-beep/fit-log)

![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 📖 Overview

**FitLog** is a responsive workout library and planning web app built with **Next.js App Router**. Users can browse a curated library of twelve lifts covering every major muscle group, open any workout to see its full specifications and step-by-step instructions, and organise their training by adding workouts to **Today's Plan** or saving them for later. A personal **My Plan** dashboard tracks exercises, total minutes and calories in real time.

---

## ✨ Key Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Workout Library** | All workouts are fetched from the FitLog API and displayed in a responsive 3 × 4 grid with muscle-group tags, equipment, duration, calories and rating. Includes live search by name or muscle group. |
| 2 | **Dynamic Workout Details** | Each workout has its own route (`/workout/[id]`) with a large illustration, key specs panel (equipment, difficulty, sets, reps, duration, calories, rating) and numbered instructions. |
| 3 | **Today's Plan & Saved List** | Add a workout to today's plan or save it for later in one click. Toast notifications confirm every action and navbar badges update instantly. Today's plan is capped at five lifts. |
| 4 | **My Plan Dashboard** | Live metrics for exercises, minutes and calories, tabbed views for Today's Plan and Saved, sorting by duration, calories or rating, plus **Mark as Done** and **Remove** actions. |
| 5 | **Persistent & Resilient UX** | Plan data is stored in `localStorage` and survives page reloads. Includes loading states, a helpful empty state, a custom 404 page and image fallbacks. |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| State Management | React Context API + `localStorage` |
| Notifications | [react-hot-toast](https://react-hot-toast.com/) |
| Icons | [react-icons](https://react-icons.github.io/react-icons/) |
| Fonts | Oswald & Inter via `next/font` |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🧠 Concepts Applied

- Server Components for data fetching and Client Components for interactivity
- Dynamic routing with `app/workout/[id]`
- Global state sharing with the Context API
- `useState`, `useEffect` and `useMemo` hooks
- Array methods (`map`, `filter`, `reduce`, `sort`, `some`) for data handling
- Conditional rendering for loading, empty and error states
- Suspense boundaries, `loading.jsx` and `not-found.jsx`
- Mobile-first responsive design

---

## 🗺️ Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero banner and the workout library |
| `/workout/[id]` | Details page for a single workout |
| `/my-plan` | Today's plan, saved workouts and training metrics |
| `*` | Custom 404 page for any unknown route |

---

## 🔌 API

| Endpoint | Purpose |
|----------|---------|
| `GET https://api.abcz.workers.dev/api/fitlog` | Fetch all workouts |
| `GET https://api.abcz.workers.dev/api/fitlog/:id` | Fetch a single workout |

---

## 📁 Project Structure

```
fit-log/
├── app/
│   ├── layout.jsx            # Root layout: fonts, providers, navbar, footer
│   ├── page.jsx              # Home: hero + workout library
│   ├── loading.jsx           # Route loading state
│   ├── not-found.jsx         # Custom 404 page
│   ├── globals.css           # Tailwind theme and global styles
│   ├── my-plan/page.jsx      # My Plan dashboard
│   └── workout/[id]/page.jsx # Dynamic workout details
├── components/               # Reusable UI components
├── context/PlanContext.jsx   # Plan & saved state with localStorage
├── lib/workouts.js           # API fetching helpers
└── public/                   # Static assets (banner image)
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js 18.18 or later

```bash
# 1. Clone the repository
git clone https://github.com/your-username/fit-log.git
cd fit-log

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production build:**

```bash
npm run build
npm start
```

---

## 📱 Responsive Design

| Screen | Layout |
|--------|--------|
| Mobile | Single-column cards, stacked hero, navigation links on their own row |
| Tablet | Two-column workout grid |
| Desktop | Three-column grid with side-by-side hero and details layout |

---

<div align="center">

**© 2026 FitLog — Workout Library. Train hard, log honest.**

</div>
