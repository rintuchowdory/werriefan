# WerRiefAn.de

German reverse phone number lookup — like Wotcha but for 🇩🇪 Germany.

## Stack
- **Frontend**: React + Vite → GitHub Pages
- **Proxy/API**: Cloudflare Worker (`worker/`)
- **Phone data**: [numverify](https://numverify.com/) (free 100 req/month)
- **Community reports**: Cloudflare KV

## Project structure
```
werriefan/
├── src/
│   ├── components/     # Navbar, Footer, SearchBar, ResultCard
│   ├── pages/          # HomePage, SearchPage, ReportPage
│   ├── hooks/          # usePhoneLookup, useReport
│   └── utils/          # formatNumber, riskColor, labels
├── worker/
│   ├── index.js        # Cloudflare Worker (proxy + KV reports)
│   └── wrangler.toml   # Wrangler config
└── .github/workflows/  # GitHub Actions → gh-pages deploy
```

## Setup

### 1. Clone & install
```bash
git clone https://github.com/rintuchowdory/werriefan.git
cd werriefan
npm install
```

### 2. Deploy the Cloudflare Worker
```bash
cd worker
npm install -g wrangler

# Create KV namespace for community reports
wrangler kv:namespace create REPORTS
# Copy the "id" output into wrangler.toml

# Set your numverify API key as a secret
wrangler secret put NUMVERIFY_API_KEY
# Paste your key from https://numverify.com/dashboard

# Deploy
wrangler deploy
# Note the worker URL: https://numcheck-proxy.YOUR-SUB.workers.dev
```

### 3. Configure frontend
```bash
cd ..
cp .env.example .env
# Edit .env:
# VITE_WORKER_URL=https://numcheck-proxy.YOUR-SUB.workers.dev
```

### 4. Local dev
```bash
npm run dev
```

### 5. Deploy frontend to GitHub Pages
```bash
# Add GitHub secret: VITE_WORKER_URL = your worker URL
# Push to main → GitHub Actions auto-deploys
git add . && git commit -m "initial commit" && git push origin main
```

## API Endpoints (Worker)

### GET /lookup?number=+4930123456
Returns phone number info + community spam data.

### POST /report
```json
{ "number": "+4930123456", "category": "spam", "comment": "Dauernd angerufen" }
```

## Upgrade path
- Add Stripe Premium (€4.99/month) — same pattern as Aura-AI
- Add Supabase for richer community DB instead of KV
- Add SMS verification to prevent fake reports
