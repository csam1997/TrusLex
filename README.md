# TrusLex - AI Litigation Explorer

AI lawsuits are exploding across America, but the data is buried where no one can see it. TrusLex makes it visible.

An interactive dashboard powered by the Database of AI Litigation (DAIL), curated by GW Law's Ethical Technology Initiative.

> 100% static at runtime - no backend and no build step. Serve the folder as static files or deploy it to GitHub Pages.

## Project Structure

```text
truslex-static/
|-- index.html
|-- assets/
|   |-- css/
|   |   `-- app.css
|   `-- js/
|       `-- app.js
|-- data/
|   |-- maps/
|   |-- secondary-links.json
|   `-- sample/
|-- tests/
|   `-- smoke.spec.js
|-- playwright.config.js
|-- package.json
`-- README.md
```

## How to Run

### Option 1 - GitHub Pages

1. Push the project to GitHub.
2. Go to Settings -> Pages -> Source -> Deploy from a branch.
3. Select the branch root and save.
4. Open the published GitHub Pages URL.

### Option 2 - Local static server

Serve the folder so the local JSON and map files can load:

```bash
# Python
python -m http.server 3000

# Then open http://localhost:3000
```

### Option 3 - Any static host

Upload the files to Netlify, Vercel, Cloudflare Pages, or any other static host. No build configuration is required.

## How to Use

1. Download your case export from the DAIL database as `.xlsx`.
2. Upload the DAIL case spreadsheet.
3. Optionally upload the secondary source coverage spreadsheet to enrich case links.
4. Use the maps and filters to slice the dataset.

Sample data files are included in `data/sample/` for testing.

## Features

- Interactive US heat map with clickable states.
- International litigation world map with country bubbles.
- Timeline, sector, and claim breakdown charts.
- Filtering by year, sector, claim type, outcome, and jurisdiction.
- Client-side XLSX parsing with SheetJS.
- Local vendored topojson map assets with CDN fallback.
- Responsive layout with browser smoke coverage.

## Tech Stack

| Component | Technology |
| --- | --- |
| Frontend | HTML / CSS / JavaScript |
| XLSX parsing | SheetJS |
| Maps | D3.js + TopoJSON |
| Testing | Playwright |
| Hosting | GitHub Pages / any static host |
| Backend | None |

## Testing

Install the optional dev dependency and run the smoke test:

```bash
npm install
npm test
```

The smoke test uploads both sample spreadsheets, verifies the dashboard loads, and checks that the US map, world map, and mobile layout render correctly.

## Data Source

[Database of AI Litigation (DAIL)](https://gwlaw.edu) - GW Law Ethical Technology Initiative
