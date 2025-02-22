# Media Scraper

A full-stack web application that scrapes media (images and videos) from provided URLs. Built with Node.js, React, PostgreSQL, and Redis.

📺 [Watch Demo Video on YouTube](https://www.youtube.com/watch?v=FLlyJeeUAW4)

<img width="1440" alt="image" src="https://github.com/user-attachments/assets/079f4822-af53-483a-8030-d3aa275423d1" />

## Features

- 🔒 Basic authentication protection
- 🖼️ Scrapes images and videos from web pages
- 📊 Paginated media gallery view
- 🔍 Filter media by type (image/video)
- 🔎 Search functionality
- 🚀 Queue-based scraping system
- 🗄️ PostgreSQL database with optimized indexes
- 📦 Docker containerization

## Tech Stack

### Backend
- Node.js + Express
- PostgreSQL (with Sequelize ORM)
- Redis + Bull for job queuing
- Cheerio for web scraping
- Basic Auth for authentication

### Frontend
- React
- Tailwind CSS
- Axios for API calls

### Infrastructure
- Docker & Docker Compose
- Nginx (for frontend serving)

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)

### Installation & Running

1. Clone the repository:

```bash
git clone https://github.com/nv10jr/media-scraper.git
cd media-scraper
```


2. Start the application using Docker Compose:

```bash
docker compose up --build
```

The application will be available at:
- Frontend: http://localhost:80
- Backend API: http://localhost:3000

## API Endpoints

### Authentication
All endpoints require Basic Authentication.

### Media Endpoints
- `GET /api/media` - Get media items with pagination
  - Query params: `page`, `limit`, `type`, `search`
- `POST /api/scrape` - Submit URLs for scraping
  - Body: `{ "urls": ["url1", "url2", ...] }`

## Architecture

### Database Schema

The Media table includes:
- UUID primary key
- URL of the media
- Source URL (where the media was found)
- Type (image/video)
- Status (pending/processing/completed/failed)
- Timestamps

### Queue System

The application uses Bull queue with Redis for:
- Managing scraping jobs
- Rate limiting requests
- Handling failed jobs
- Auto-removing completed jobs

### Performance Optimizations

1. Database:
   - Optimized indexes for common queries
   - Composite indexes for filtered searches
   - Connection pooling

2. Media Loading:
   - Lazy loading of images
   - Pagination of results
   - Efficient bulk insertions

3. Infrastructure:
   - Resource limits for containers
   - Health checks for services
   - Nginx serving static files

<img width="904" alt="image" src="https://github.com/user-attachments/assets/1f21cd46-eed1-48ce-ba8c-ec3a84cd63e4" />
<img width="1181" alt="image" src="https://github.com/user-attachments/assets/6d360bbd-8c6f-44f4-8fd4-2eef6968b20f" />


## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
