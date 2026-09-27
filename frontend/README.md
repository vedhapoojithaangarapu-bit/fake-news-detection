# FakeDetect AI — Fake News Detection using NLP (Frontend)

Modern, clean, responsive frontend built with **React + Vite + React Router**.

## Features

- Landing page with hero, features, how-it-works, CTA
- Sign In / Sign Up with validation + show/hide password (dummy auth, no backend)
- Dashboard, Check News form with loading state, Result page with confidence bar
- About page explaining fake news, NLP, and the pipeline
- Reusable components: Navbar, Footer, FeatureCard, NewsForm, ResultCard, LoadingSpinner
- Fully responsive (desktop / tablet / mobile), accessible labels, no console errors

## Project structure

```
src/
  App.jsx            # Router + auth/analysis context + protected routes
  main.jsx
  index.css          # All global + responsive styles
  components/
    Navbar.jsx
    Footer.jsx
    FeatureCard.jsx
    NewsForm.jsx
    ResultCard.jsx
    LoadingSpinner.jsx
  pages/
    Landing.jsx
    SignIn.jsx
    SignUp.jsx
    Dashboard.jsx
    DetectNews.jsx
    Result.jsx
    About.jsx
  utils/
    dummyPredict.js  # Dummy NLP prediction (replace with backend later)
```

## Routes

| Route        | Page      |
| ------------ | --------- |
| `/`          | Landing   |
| `/signin`    | Sign In   |
| `/signup`    | Sign Up   |
| `/dashboard` | Dashboard |
| `/detect`    | Detect News |
| `/result`    | Result    |
| `/about`     | About     |

Flow: Landing → Sign In / Sign Up → Dashboard → Check News → Analyze → Result.

## Run locally

```powershell
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```powershell
npm run build
npm run preview
```

## Notes

- Auth is simulated with `localStorage` (`fd_logged_in`, `fd_user`).
- Last analysis is stored in `sessionStorage` (`fd_analysis`).
- Prediction is dummy logic in `src/utils/dummyPredict.js` — swap it for a real API call when the NLP backend is ready.
