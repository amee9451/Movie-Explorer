# Movie Explorer

A modern, responsive movie search application built with **React**, **TypeScript**, **Tailwind CSS**, and **OMDB API**. It supports adding movies to favorites, viewing detailed info, and utilizes **SWR** for fast and cached API calls.

## 🚀 Features
- 🔍 Search for movies by title
- ⭐ Mark/unmark movies as favorites (persisted via `localStorage`)
- 🧠 Caching using SWR for efficient data fetching
- 🧰 Utility functions for API separation
- 📱 Responsive UI using Tailwind CSS
- 🌐 React Router for dynamic routes
- ✅ TypeScript for type safety

## 🛠️ Tech Stack
- React 18+
- TypeScript
- Tailwind CSS
- SWR
- React Router DOM
- Axios
- OMDB API

## 🔧 Setup Instructions
```bash
git clone https://github.com/your-username/movie-explorer.git
cd movie-explorer
npm install
```

### Run the app
```bash
npm start
```

### Build for production
```bash
npm run build
```

### Run tests
```bash
npm run test
```

## ⚙️ Scripts
```json
"start": "webpack serve --config webpack.dev.js",
"build": "webpack --config webpack.prod.js",
"test": "jest",
"lint": "eslint src --ext .ts,.tsx",
"format": "prettier --write .",
"prepare": "husky install"
```

## ⚖️ Decisions & Trade-offs
- **Webpack+Babel** instead of CRA to demonstrate manual build tooling control.
- **Tailwind CSS** for utility-first responsive styling.
- **React Router** for routing between views.
- **localStorage** for simplicity in persisting favorites (no backend).

## 🔮 Potential Improvements
- Add pagination/infinite scroll on search results
- Improve accessibility with focus management
- Use SWR or React Query for caching + data fetching
- Store favorites in backend/db for user accounts

---

// docs/deployment.md
# Deployment & CI/CD 📦

## 🌍 Recommended Hosting
**Option 1: Vercel or Netlify**
- Easy GitHub integration
- Auto deployment on push
- Handles React SPA routing well

**Option 2: AWS S3 + CloudFront**
- Run `npm run build`
- Upload `dist/` folder to S3 bucket
- Configure CloudFront for CDN delivery
- Set S3 bucket for static site hosting

## 🔐 Handling Environment Variables
- Store your OMDB API key in a `.env` file:
  ```env
  OMDB_API_KEY=your_api_key
  ```
- Use `dotenv-webpack` or similar in Webpack to inject env vars
- Never commit `.env` to version control

## 🔁 CI/CD Pipeline
- Use GitHub Actions:
```yaml
name: CI
on:
  push:
    branches: [main]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Lint
        run: npm run lint
      - name: Format Check
        run: npm run format
      - name: Run Tests
        run: npm test
```
- On success, deploy using Vercel/Netlify Git integration or upload to S3 via CLI/CDK

---

All set! 💥 Let me know if you want help with GitHub repo setup or want to deploy this live.
