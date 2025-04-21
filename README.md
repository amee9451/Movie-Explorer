# Movie Explorer

A modern, responsive movie search application built with **React**, **TypeScript**, **Tailwind CSS**, and **OMDB API**. It supports adding movies to favorites, viewing detailed info, and utilizes **SWR** for fast and cached API calls.

## Features

- Search for movies by title
- Mark/unmark movies as favorites (persisted via `localStorage`)
- Search movies using the OMDB API
- Add or remove favorites (persisted in localStorage)
- Movie details page
- Fast API fetching with SWR
- Smart caching (5-minute deduplication)
- Client-side routing with React Router
- Styled with Tailwind CSS
- Unit tests with React Testing Library + Jest
- ESLint + Prettier + Husky pre-commit hooks
- Environment variables with dotenv
- Deployed via Vercel
- Sanitize all user input where applicable (search terms, query strings)

## 🛠️ Tech Stack

- React + TypeScript
- SWR – data fetching with caching
- Tailwind CSS – utility-first styling
- Jest & React Testing Library – testing
- Vite / Webpack (depending on build)
- dotenv for .env config
- Husky, ESLint, Prettier for code quality
- Vercel for deployment

## Screenshot

![Movie Explorer Home ](https://github.com/amee9451/Movie-Explorer/blob/main/public/assets/home.png)
![Movie Explorer Select Favorites Movie](https://github.com/amee9451/Movie-Explorer/blob/main/public/assets/Favorites_select.png)
![Movie Explorer List Of Favorites](https://github.com/amee9451/Movie-Explorer/blob/main/public/assets/list_of_Favorites.png)
![Movie Explorer Movie Details](https://github.com/amee9451/Movie-Explorer/blob/main/public/assets/movie_details.png)


## Demo Video
![Movie Explorer Demo](https://github.com/amee9451/Movie-Explorer/blob/main/public/assets/movie-explorer.mov)

## 🔧 Setup Instructions

```bash
git clone https://github.com/amee9451/movie-explorer.git
cd movie-explorer
npm install
```

## Configure environment variables
- Create a ```.env``` file in the root
```bash
OMDB_API_KEY=your_omdb_api_key
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

## Scripts

```json
  "lint": "eslint src --ext .ts,.tsx",
  "format": "prettier --write .",
  "prepare": "husky install",
  "test": "jest",
  "start": "webpack serve --config webpack.dev.js",
  "build": "webpack --config webpack.prod.js",
  "coverage":"npm test -- --coverage",
  "test:bail": "jest --bail"
```

## Decisions & Trade-offs

- **Webpack+Babel** instead of CRA to demonstrate manual build tooling control.
- **Tailwind CSS** for utility-first responsive styling.
- **React Router** for routing between views.
- **localStorage** for simplicity in persisting favorites (no backend).

## Potential Improvements

- Add pagination/infinite scroll on search results
- Improve accessibility with focus management
- Store favorites in backend/db for user accounts
- Add caching on static images, fonts, and JavaScript files
- Optimize images to serve appropriate formats (AVIF, WebP, JPEG2000) with fallbacks
- Implement Jest coverage reporting for better testing visibility
- Integrate SonarQube to monitor code quality and performance
- Introduce a backend API layer (Node.js/GraphQL) as a proxy for OMDB API
  - This avoids exposing the OMDB_API_KEY in the frontend
  - Enables better security, request throttling, and caching
  - Allows additional business logic and error handling on the server
- All static test should be come from CMS or const file.   

## Potential Security Improvements

- Move the OMDB API interaction to a backend service (Node.js/GraphQL) to prevent exposing the OMDB_API_KEY on the client side
- Use environment variables with .env files and restrict public access in frontend builds
- Configure CSP (Content Security Policy) headers to restrict allowed domains for resources
- Set proper CORS headers on backend API responses
- Use HTTPS for all deployments (handled by default on Vercel)
- Enable strict linting rules and type safety to avoid injection vulnerabilities
- Protect localStorage usage by limiting exposure of sensitive data (e.g., only storing non-sensitive IDs)
- Enable security headers (e.g., X-Content-Type-Options, Strict-Transport-Security) via Vercel or custom server config
- Audit dependencies regularly using npm audit or GitHub Dependabot alerts
- Implement rate limiting and logging on backend APIs to prevent abuse
- Add authentication and authorization layers if user accounts are introduced in the future


# Deployment & CI/CD

## Recommended Hosting

**Option 1: Vercel or Netlify [Selected]**

- Easy GitHub integration
- Auto deployment on push
- Handles React SPA routing well

**Option 2: AWS S3 + CloudFront**

- Run `npm run build`
- Upload `dist/` folder to S3 bucket
- Configure CloudFront for CDN delivery
- Set S3 bucket for static site hosting

## Handling Environment Variables

- Store your OMDB API key in a `.env` file:
  ```env
  OMDB_API_KEY=your_api_key
  ```
- Use `dotenv-webpack` or similar in Webpack to inject env vars
- Never commit `.env` to version control

## CI/CD Pipeline

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

Testing URL on Vercel: TBD
