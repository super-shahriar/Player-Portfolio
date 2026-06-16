

# 🏐 Volleyball Player Portfolio - Full Stack Application

A comprehensive full-stack application for showcasing volleyball players' profiles, statistics, career highlights, and achievements. Built with modern technologies across both frontend and backend.


---
<img width="1903" height="864" alt="629506644_883883354401082_6839903594927698516_n" src="https://github.com/user-attachments/assets/34465227-c9d6-469e-97f6-54caf50bc5de" />
<img width="1885" height="854" alt="628212083_782196707657597_3086464368193316263_n (1)" src="https://github.com/user-attachments/assets/64f2d261-1ae7-4e51-bf75-202a0f96aec3" />

# Check out the Referee App:
<img width="2048" height="922" alt="631498622_951973624171901_6224011263889838458_n" src="https://github.com/user-attachments/assets/b0f4dda1-0582-4ace-a4b4-c41e2c453bd8" />



## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Quick Start Guide](#quick-start-guide)
- [Features](#features)
- [Architecture](#architecture)
- [Backend Details](#backend-details)
- [Frontend Details](#frontend-details)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

The Volleyball Player Portfolio is a full-stack web application designed to:
- **Showcase Players**: Create detailed profiles for volleyball players
- **Track Statistics**: Maintain comprehensive performance metrics
- **Share Highlights**: Upload and organize career highlights and stories
- **Enable Discovery**: Allow fans and scouts to find players by various filters
- **Provide Analytics**: Visualize player performance data

### Audience
- **Players**: Build and share their professional portfolio
- **Coaches**: Scout and recruit talent
- **Fans**: Discover and follow favorite players
- **Commentators**: Access player information for broadcasts

---

## 🛠 Technology Stack

### Frontend
| Component | Technology |
|-----------|-----------|
| **Framework** | Next.js 16.1.6 (React framework) |
| **Language** | TypeScript 5.7.3 |
| **Styling** | Tailwind CSS 3.4.17 |
| **UI Library** | shadcn/ui (Radix UI) |
| **Forms** | React Hook Form 7.54.1 |
| **Validation** | Zod 3.24.1 |
| **Charts** | Recharts 2.15.0 |
| **Theme** | next-themes 0.4.6 |
| **Bundler** | Turbopack (built-in) |

### Backend
| Component | Technology |
|-----------|-----------|
| **Framework** | FastAPI 0.104.1 |
| **Language** | Python 3.9+ |
| **Database** | MongoDB (NoSQL) |
| **ORM** | Motor (async MongoDB driver) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Validation** | Pydantic |
| **AI Integration** | Google Gemini API (optional) |
| **Containerization** | Docker |
| **Server** | Uvicorn |

---

## 📁 Project Structure

```
Player Portfolio/
│
├── frontend/                    # 🎨 React/Next.js Application
│   ├── README.md               # Frontend documentation
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.mjs
│   │
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── player/[id]/page.tsx
│   │   └── players/
│   │       ├── page.tsx
│   │       ├── country/page.tsx
│   │       ├── division/page.tsx
│   │       ├── highlights/page.tsx
│   │       ├── school/page.tsx
│   │       └── university/page.tsx
│   │
│   ├── components/
│   │   ├── athlete-portrait.tsx
│   │   ├── bio-trivia.tsx
│   │   ├── performance-radar.tsx
│   │   ├── player-card.tsx
│   │   ├── sidebar-navbar.tsx
│   │   ├── stats-cards.tsx
│   │   └── ui/                 # 40+ shadcn/ui components
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/
│   │   ├── player-data.ts
│   │   └── utils.ts
│   │
│   └── public/                 # Static assets
│
├── backend/                     # 🐍 FastAPI Application
│   ├── README.md               # Backend documentation
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── .env.example
│   │
│   ├── app/
│   │   ├── main.py             # FastAPI entry point
│   │   │
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── api.py
│   │   │       └── endpoints/
│   │   │           ├── athletes.py
│   │   │           ├── stats.py
│   │   │           ├── stories.py
│   │   │           └── actions.py
│   │   │
│   │   ├── models/
│   │   │   ├── athlete.py
│   │   │   ├── story.py
│   │   │   └── py_object_id.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── athlete.py
│   │   │   ├── stats.py
│   │   │   └── token.py
│   │   │
│   │   ├── crud/
│   │   │   ├── crud_athlete.py
│   │   │   ├── crud_stats.py
│   │   │   └── crud_story.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   │
│   │   ├── db/
│   │   │   ├── mongodb.py
│   │   │   └── base.py
│   │   │
│   │   └── services/
│   │       └── gemini_ai.py
│   │
│   └── tests/                  # Backend tests
│
└── README.md                   # This file (Project root documentation)
```

---

## 🚀 Getting Started

### Prerequisites

**For Frontend:**
- Node.js 18.0 or higher
- npm 9.0+ or pnpm 8.0+

**For Backend:**
- Python 3.9 or higher
- pip or conda
- MongoDB (local or cloud)

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd Player\ Portfolio
```

#### 2. Frontend Setup
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```
Frontend runs on: `http://localhost:3000`

#### 3. Backend Setup
```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

#### 4. Environment Configuration
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB connection and API keys
```

#### 5. Run Backend
```bash
uvicorn app.main:app --reload
```
Backend runs on: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

---

## ⚡ Quick Start Guide

### Start Both Services Simultaneously

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn app.main:app --reload
```

### Verify Installation

- **Frontend**: Open [http://localhost:3000](http://localhost:3000)
- **Backend API Docs**: Open [http://localhost:8000/docs](http://localhost:8000/docs)
- **Backend ReDoc**: Open [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## ✨ Features

### Player Management
✅ Create, read, update, and delete player profiles  
✅ Store player demographics (name, position, height, weight, etc.)  
✅ Track career history and achievements  
✅ Player ratings and reviews  

### Statistics Tracking
✅ Comprehensive performance metrics  
✅ Season statistics  
✅ Historical data tracking  
✅ Advanced filtering by stats  

### Highlights & Stories
✅ Upload and share career highlights  
✅ Video and image support  
✅ Story descriptions and metadata  
✅ Like and clap reactions  
✅ Reaction counting and display  

### Discovery & Filtering
✅ Filter players by country  
✅ Filter by competition division  
✅ Filter by school/university  
✅ Highlight reels collection  
✅ Quick search functionality  

### User Experience
✅ Responsive design (mobile, tablet, desktop)  
✅ Dark mode support  
✅ Smooth animations  
✅ Intuitive navigation  
✅ Performance radar charts  
✅ Bio and trivia elements  

### Backend Features
✅ RESTful API with semantic versioning  
✅ JWT authentication  
✅ CORS security  
✅ Pydantic validation  
✅ Async MongoDB operations  
✅ Error handling and logging  
✅ AI-powered insights (optional)  

---

## 🏗️ Architecture

### Design Patterns

#### Frontend
- **Component-Based Architecture**: Reusable React components
- **Server-Side Rendering**: Next.js SSR for SEO
- **Custom Hooks**: Encapsulated state logic
- **Utility Functions**: Shared logic and helpers

#### Backend
- **Controller-Service-Repository Pattern**: Separation of concerns
- **Async Operations**: Non-blocking I/O
- **Schema Validation**: Pydantic models
- **CRUD Operations**: Abstracted database interactions
- **Security Layer**: JWT tokens and password hashing

### Data Flow

```
User Action (Frontend)
    ↓
React Component State Update
    ↓
API Call (HTTP Request)
    ↓
FastAPI Router (Endpoint)
    ↓
Request Validation (Pydantic Schema)
    ↓
Business Logic (CRUD Operations)
    ↓
MongoDB Database
    ↓
Response (JSON)
    ↓
Frontend State Update
    ↓
UI Render
```

---

## 🔌 Backend Details

### API Endpoints Overview

**Base URL**: `http://localhost:8000/api/v1`

#### Athletes Endpoints
```
POST   /athletes/              Create new player
GET    /athletes/              Get all players
GET    /athletes/{id}          Get specific player
PATCH  /athletes/{id}          Update player
DELETE /athletes/{id}          Delete player
```

#### Stats Endpoints
```
POST   /stats/                 Add player stats
GET    /stats/{athlete_id}     Get player statistics
PATCH  /stats/{stat_id}        Update statistics
```

#### Stories Endpoints
```
POST   /stories/               Create new story/highlight
GET    /stories/               Get all stories
GET    /stories/highlights     Get featured highlights
GET    /stories/{id}           Get specific story
```

#### Actions Endpoints
```
POST   /stories/{id}/like      Like a story
POST   /stories/{id}/clap      Clap for a story
GET    /stories/{id}/reactions Get reaction counts
```

### Authentication
- JWT-based authentication
- Token generation on login
- Secure password hashing (bcrypt)
- CORS protection

### Database Models
See [backend/README.md](backend/README.md) for detailed schema documentation

---

## 🎨 Frontend Details

### Key Components

**Page Components:**
- `page.tsx` - Home landing page
- `players/page.tsx` - Player directory
- `player/[id]/page.tsx` - Individual player detail

**Feature Components:**
- `player-card.tsx` - Player profile card
- `performance-radar.tsx` - Stats visualization
- `stats-cards.tsx` - Key metrics display
- `sidebar-navbar.tsx` - Main navigation

**UI Components:** 40+ reusable shadcn/ui components

### State Management
- React Hooks for local state
- Form logic via React Hook Form
- Theme state via next-themes
- Custom hooks for reusable logic

### Responsive Design
- Mobile-first approach
- Tailwind CSS breakpoints
- Touch-friendly UI
- Optimized performance

See [frontend/README.md](frontend/README.md) for detailed documentation

---

## 📚 API Documentation

### Interactive API Documentation

**Swagger UI (OpenAPI):**
```
http://localhost:8000/docs
```

**ReDoc (Alternative):**
```
http://localhost:8000/redoc
```

### Making API Requests

**Using cURL:**
```bash
# Get all players
curl http://localhost:8000/api/v1/athletes/

# Create a new player
curl -X POST http://localhost:8000/api/v1/athletes/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "position": "Outside Hitter",
    "country": "USA"
  }'
```

**Using JavaScript/Fetch:**
```javascript
// Get players
const response = await fetch('http://localhost:8000/api/v1/athletes/')
const players = await response.json()

// Create player
const newPlayer = await fetch('http://localhost:8000/api/v1/athletes/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Jane Smith',
    position: 'Setter',
    country: 'Canada'
  })
})
```

---

## 💾 Database Schema

### MongoDB Collections

**Athletes Collection**
```json
{
  "_id": ObjectId,
  "name": String,
  "position": String,
  "country": String,
  "height": Number,
  "weight": Number,
  "school": String,
  "university": String,
  "division": String,
  "achievements": [String],
  "created_at": DateTime,
  "updated_at": DateTime
}
```

**Stories Collection**
```json
{
  "_id": ObjectId,
  "athlete_id": ObjectId,
  "title": String,
  "description": String,
  "media_url": String,
  "type": String,
  "likes": Number,
  "claps": Number,
  "created_at": DateTime
}
```

**Stats Collection**
```json
{
  "_id": ObjectId,
  "athlete_id": ObjectId,
  "season": String,
  "games_played": Number,
  "kills": Number,
  "blocks": Number,
  "digs": Number,
  "aces": Number,
  "serving_percentage": Number,
  "passing_percentage": Number,
  "created_at": DateTime
}
```

---

## 🐳 Deployment

### Docker Deployment

**Build Backend Image:**
```bash
cd backend
docker build -t volleyball-backend .
docker run -p 8000:8000 --env-file .env volleyball-backend
```

**Docker Compose (Both Services):**
```bash
docker-compose up
```

### Cloud Deployment Options

**Frontend:**
- Vercel (recommended for Next.js)
- Netlify
- AWS S3 + CloudFront
- Google Cloud Run

**Backend:**
- Heroku
- Railway
- Render
- AWS EC2
- Google Cloud Run
- DigitalOcean

**Database:**
- MongoDB Atlas (cloud)
- AWS DocumentDB
- Azure Cosmos DB

---

## 🤝 Contributing

### Development Process

1. **Create feature branch**: `git checkout -b feature/amazing-feature`
2. **Make changes** following code standards
3. **Test thoroughly**
4. **Commit with meaningful messages**: `git commit -m 'Add amazing feature'`
5. **Push to branch**: `git push origin feature/amazing-feature`
6. **Open Pull Request** with description

### Code Standards

**Frontend:**
- Use TypeScript strictly
- Follow ESLint rules
- Use Tailwind utility classes
- Component naming: PascalCase
- Write meaningful variable names

**Backend:**
- Follow PEP 8 style guide
- Type hints for all functions
- Docstrings for complex logic
- Clear variable naming
- Proper error handling

### Testing

```bash
# Backend
cd backend
pytest tests/

# Frontend
cd frontend
npm test
```

---

## 📋 Project Checklist

- [x] Backend API development
- [x] Frontend UI implementation
- [x] Database schema design
- [x] Authentication system
- [x] Player profiles
- [x] Statistics tracking
- [x] Highlights/Stories
- [ ] User authentication UI
- [ ] Search functionality enhancement
- [ ] Analytics dashboard
- [ ] Social sharing
- [ ] Video streaming
- [ ] PWA support

---

## 📝 License

This project is developed for the Volleyball Player Portfolio application.

---

## 🆘 Support & Resources

### Documentation
- [Frontend README](frontend/README.md) - Detailed frontend documentation
- [Backend README](backend/README.md) - Detailed backend documentation
- [API Documentation](http://localhost:8000/docs) - Interactive Swagger

### Common Issues

**Frontend won't start:**
- Ensure Node.js is installed: `node --version`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check port 3000 is available

**Backend won't connect:**
- Verify MongoDB is running
- Check `.env` file has correct connection string
- Ensure port 8000 is available

**API calls failing:**
- Verify both servers are running
- Check network tab in browser DevTools
- Review API documentation at `/docs`

---

## 🚀 Roadmap

### Phase 1 (Current)
- ✅ Basic player profiles
- ✅ Statistics tracking
- ✅ Stories/highlights

### Phase 2 (Planned)
- [ ] User authentication
- [ ] Advanced filtering
- [ ] Player comparisons
- [ ] Analytics dashboard

### Phase 3 (Future)
- [ ] Live match tracking
- [ ] Social features
- [ ] Video streaming
- [ ] Mobile app
- [ ] AI recommendations

---

## 👥 Team

Built with ❤️ by the development team

---

## 📞 Contact & Questions

For questions or support:
1. Review relevant README files
2. Check API documentation
3. Open an issue on GitHub
4. Reach out to the team

---

**Let's build the best volleyball platform! 🏐✨**
