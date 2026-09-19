# GoNbite Website

Vite + React website with React Router and React Helmet.

## Run

`npm install`
`npm run dev`

Create `.env` from `.env.example` and set `VITE_API_URL` to the deployed GoNbite API.

## SEO

The website now includes:
- route-aware title, description and canonical tags
- Open Graph/Twitter metadata
- `noindex` for authentication and admin routes
- corrected public sitemap and robots rules
- public blog listing and individual article routes
- dynamic blog metadata on article pages

For production SPA hosting, configure the host to serve `index.html` for application routes such as `/blogs/my-story`, `/login`, and `/admin/dashboard`.
