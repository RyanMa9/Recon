# Live App

App is deployed at: https://recon-gamma.vercel.app/

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Disclaimer on Data](#Disclaimer-on-Data)
- [License](#license)

## Overview

Recon is a full-stack web application designed to provide detailed analytics on UFC fighters. The platform delivers fighter performance metrics,
historical trends, and percentile-based rankings for major statistical categories. Users can explore fighter profiles,
compare skills across divisions and time periods, and gain insights for match-up analysis. Recon is designed for analysts, fighters, and fans who want a deeper understanding of
fighter performance beyond basic stats.

## Features

- Fighter Profiles: View detailed stats, historical performance trends, and key metrics for each UFC fighter
- Search & Filtering: Search for fighters then filter by division and time period to see metrics
- Percentile Rankings: Compare fighters across divisions using percentile-based rankings for benchmarking
- Performance Visualizations: Interactive charts and visualizations to highlight trends, tendencies, and match-up insights
- Real-Time Analytics: RESTful API serves structured fight data, enabling easy access to analytics tools
- Full-Stack Architecture: React/Next.js frontend with Flask backend and PostgreSQL database ensures scalable and responsive performance

## Tech Stack

Frontend:

- Next.js v16.1.6 (React 19)
- Typescript
- Tailwind CSS
- Shadcn UI Components
- Chart.js / Recharts

Backend:

- Python Flask
- RESTful API architecture
- Pandas
- Psychopg2 (PostgreSQL adapter)

Database:

- PostgreSQL

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/RyanMa9/Recon.git
cd Recon
```
### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 4. Load sample data into database using Supabase
- Sign up for an account at Supabase.com
- Go to 'SQL editor' then copy and paste given SQL file
- Hit run and make sure data is loaded properly
- Copy Database URL from 'connect' for next step (URI, Primary Database, Method: Transaction pooler your network is not IPv4 compatible, else Direct Connection)


### 5. Create a .env file in the backend directory:
```bash
DATABASE_URL=your_database_url
```

### 6. Create a .env.local file in the frontend directory:
```bash
NEXT_PUBLIC_API_BASE=http://127.0.0.1:5000/
```

### 7. Explore the App
Open http://localhost:3000 in your browser


## Usage

- Search up fight stats from dataset
- Analyze visualizations and percentile based rankings
- Filter fight metrics across weight divisions and time

## Disclaimer on Data

- This repository includes a small sample dataset for testing and demonstration purposes that contains just 3 fighters (Jon "Bones" Jones, Alvin "Goozie" Hines, and Tom Aaron) and 1 fight each for Goozie and Bones.
- The app is fully functional with the sample data, so you can explore fighter profiles, filters, and visualizations for those fighters.
- The full dataset (~50k fighter records) is not included here to keep the repo lightweight. Scraper and data can be provided upon request.

## License

This project is licensed under the MIT License.


