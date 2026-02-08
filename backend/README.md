

# 🏐 Volleyball Portfolio Backend (Explained for Kids)

This project is like a super-powered digital notebook for volleyball players! It helps you keep track of players, their stats, and their best moments (stories and highlights). It's built using Python (a programming language), FastAPI (a tool to make websites for computers), and MongoDB (a place to store lots of information).

---

## 📁 What Do All These Folders and Files Do?

### In the main folder:
- **README.md**: This file! It explains everything.
- **requirements.txt**: A shopping list of all the Python tools this project needs.
- **Dockerfile**: Instructions for putting the project in a "box" so it works anywhere.
- **.env / .env.example**: Secret notes for the computer (like passwords and special codes).
- **.gitignore**: Tells Git which files to ignore (like not saving your homework drafts).

### The app/ folder (the brain of the project):
- **main.py**: The front door! Starts the app and connects all the parts.

#### app/core/
- **config.py**: The rulebook. Reads the secret notes and sets up the app.
- **security.py**: The lock and key! Makes sure only the right people can log in.

#### app/db/
- **mongodb.py**: The phone to the database. Talks to MongoDB to save and get info.
- **base.py**: Helps translate MongoDB's special ID numbers.

#### app/models/
- **athlete.py**: The blueprint for a player (name, stats, etc).
- **story.py**: The blueprint for a story or highlight (like a cool video or picture).
- **py_object_id.py**: Helps with MongoDB's special ID numbers.

#### app/schemas/
- **athlete.py**: Checks if the info about a player is correct before saving.
- **stats.py**: Checks if the stats (like scores) are correct.
- **token.py**: Checks if login info is correct.

#### app/crud/
- **crud_athlete.py**: The worker for players. Adds, finds, changes, or deletes players.
- **crud_stats.py**: The worker for stats. Adds, finds, changes, or deletes stats.
- **crud_story.py**: The worker for stories. Adds, finds, changes, or deletes stories.

#### app/api/v1/endpoints/
- **athletes.py**: The rules for what you can do with players (like add or see a player).
- **stats.py**: The rules for what you can do with stats.
- **stories.py**: The rules for what you can do with stories.
- **actions.py**: The rules for liking or clapping for a story.

#### app/services/
- **gemini_ai.py**: (Optional) A robot helper that can give smart advice about players (uses AI).

---

## 🏗️ How Does It All Work Together?

1. **You (or your app) send a request** (like "add a new player!") to the server.
2. The server checks if the info is correct (using schemas).
3. The worker (CRUD) saves it in the database (MongoDB).
4. The server sends back a message: "All done!" or "Here's the info you wanted!"

---

## 🚀 How to Start Playing With It

1. Open a terminal (like a command window).
2. Go to the backend folder: `cd backend`
3. Make a virtual environment: `python -m venv venv` followed by `venv\Scripts\activate`
4. Install the tools: `pip install -r requirements.txt`
5. Copy `.env.example` to `.env` and fill in your MongoDB info.
6. Start the server: `uvicorn app.main:app --reload`
7. Open your web browser and go to [http://localhost:8000/docs](http://localhost:8000/docs) to see and try all the features!

---

## 🧩 Example: Adding a New Player

1. Go to the docs page in your browser.
2. Find the "POST /api/v1/athletes/" button.
3. Click "Try it out" and fill in the player's info (like name, position, etc).
4. Click "Execute" and—boom!—the player is saved in the database.

---

## 🛡️ How Is It Safe?

- Passwords are scrambled so no one can read them.
- Only people with the right key (token) can do certain things.
- The app only lets the frontend talk to it if it's on the allowed list (CORS).

---

## 🧪 How to Test

- Use the docs page to try out all the features (add, get, update, delete players, stats, stories, etc).
- You can also write tests in the `tests/` folder if you want to get fancy.

---

## 📝 Want to Help?

You can copy this project, make changes, and share your ideas! If you find a bug or want to add something cool, let us know!
- **RESTful Design**: Clean API following REST principles with semantic versioning (v1)

## 🏗️ Architecture

### Enterprise-Grade Structure (Controller-Service-Repository Pattern)

```
backend/
├── app/
│   ├── main.py                    # 🔌 Entry point: FastAPI app initialization & lifespan
│   │
│   ├── db/
│   │   ├── __init__.py
│   │   ├── mongodb.py             # 🗄️ Async Motor client setup & DB connection
│   │   └── base.py                # Utility for ObjectId ↔ String conversion
│   │
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py              # ⚙️ Pydantic Settings: Env variables & app config
│   │   └── security.py            # 🔒 JWT tokens, password hashing, auth logic
│   │
│   ├── api/                       # 🛣️ Controller Layer: HTTP Entry Points
│   │   ├── __init__.py
│   │       ├── __init__.py
│   │       ├── api.py             # Root router: Central hub merging all sub-routers
│   │       └── endpoints/
│   │           ├── __init__.py
│   │           ├── athletes.py    # Routes: POST/GET/PATCH/DELETE /athletes
│   │           ├── stats.py       # Routes: POST/GET/PATCH /stats
│   │           ├── stories.py     # Routes: POST /stories, GET highlights
│   │           └── actions.py     # Routes: POST /like, POST /clap
│   │
│   ├── models/                    # 📄 Data Model Layer: MongoDB document structures
│   │   ├── __init__.py
│   │   ├── story.py               # StoryModel: Highlights with reactions & media URLs
│   │   └── py_object_id.py        # Custom type for MongoDB ObjectId handling
│   │
│   ├── schemas/                   # 🔍 Validation Layer: Pydantic request/response schemas
│   │   ├── stats.py               # StatsCreate, StatsUpdate schemas with ranges
│   │   ├── story.py               # StoryCreate, StoryRead schemas
│   ├── crud/                      # 💾 Logic Layer: Database operations (reusable workers)
│   │   ├── __init__.py
│   │   ├── crud_athlete.py        # create_athlete(), update_stats(), delete_athlete(), etc.
│   │   ├── crud_stats.py          # Stat tracking and retrieval
│   │   └── crud_story.py          # add_story(), get_highlights(), add_reaction(), etc.
│   │
│   └── services/                  # 🧠 Service Layer: Complex business logic (optional)
│       ├── __init__.py
│       └── gemini_ai.py           # AI analysis of stats & scouting notes
│
├── tests/                         # 🧪 Pytest unit & integration tests
│
├── .env.example                   # Template for environment variables
├── .gitignore                     # Git ignore rules
├── requirements.txt               # Python dependencies
└── README.md                      # This file!
```

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **FastAPI** | 0.115.0+ | Modern async web framework with auto-docs |
| **Motor** | 3.6.0+ | Async MongoDB driver (non-blocking I/O) |
| **Pydantic** | 2.9.2+ | Data validation using Python type hints |
| **Uvicorn** | 0.30.0+ | ASGI server |
| **PyMongo** | 4.6.0+ | MongoDB driver (underlying Motor) |
| **python-jose** | 3.3.0+ | JWT token generation & verification |
| **passlib** | 1.7.4+ | Secure password hashing |

## 🚀 Quick Start

- **Python** 3.10 or higher
- **Git** for version control

### Installation

1. **Navigate to the backend directory**:
   ```bash
   cd "Player Portfolio/backend"
   ```

2. **Create and activate virtual environment**:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate
   
   # Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   ```bash
   # Copy the example file
   cp .env.example .env
   ```
   
   **Edit `.env`** with your MongoDB connection:
   ```env
   # Local MongoDB
   MONGODB_URL=mongodb://localhost:27017
   MONGODB_DB_NAME=volleyball_portfolio
   
   # OR MongoDB Atlas (cloud)
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   MONGODB_DB_NAME=volleyball_portfolio
   
   # API Configuration
   APP_NAME=Volleyball Portfolio API
   APP_VERSION=1.0.0
   SECRET_KEY=your-super-secret-key-here-change-in-production
   DEBUG=true
   CORS_ORIGINS=http://localhost:3000,http://localhost:8000
   ```

5. **Start MongoDB** (if running locally):
   ```bash
   # Windows
   mongod
   
   # Linux/Mac
   brew services start mongodb-community
   # OR
   mongod --config /usr/local/etc/mongod.conf
   ```

6. **Run the application**:
   ```bash
   # Development with auto-reload
   uvicorn app.main:app --reload
   
   # OR
   python -m uvicorn app.main:app --reload
   
   # Production (without reload)
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

7. **Access the API**:
   - 📚 **Swagger UI**: http://localhost:8000/docs
   - 📖 **ReDoc**: http://localhost:8000/redoc
   - ❤️ **Health Check**: http://localhost:8000/health

## 📚 API Documentation

### Athlete Endpoints

#### Create Athlete
```http
POST /api/v1/athletes/
Content-Type: application/json

{
  "first_name": "Sarah",
  "last_name": "Johnson",
  "email": "sarah.johnson@example.com",
  "position": "Outside Hitter",
  "height_cm": 185,
  "jersey_number": 12,
  "team": "State University",
  "is_active": true
}

Response (201):
{
  "id": "507f1f77bcf86cd799439011",
  "first_name": "Sarah",
  "last_name": "Johnson",
  "email": "sarah.johnson@example.com",
  "position": "Outside Hitter",
  "height_cm": 185,
  "jersey_number": 12,
  "team": "State University",
  "is_active": true,
  "created_at": "2026-02-08T10:30:00Z",
  "updated_at": "2026-02-08T10:30:00Z"
}
```

#### Get Athlete
```http
GET /api/v1/athletes/{athlete_id}

Response (200):
{
  "id": "507f1f77bcf86cd799439011",
  "first_name": "Sarah",
  "last_name": "Johnson",
  "email": "sarah.johnson@example.com",
  "position": "Outside Hitter",
  "height_cm": 185,
  "weight_kg": 75.5,
  "jersey_number": 12,
  "team": "State University",
  "is_active": true,
  "performance_stats": {
    "vertical_jump_cm": 82.5,
    "approach_jump_cm": 95.0,
    "spike_power_kmh": 110.5,
    "serve_power_kmh": 95.0,
    "hitting_rating": 9,
    "serving_rating": 8,
    "passing_rating": 9,
    "setting_rating": 7,
    "blocking_rating": 8,
    "defense_rating": 9
  },
  "created_at": "2026-02-08T10:30:00Z",
  "updated_at": "2026-02-08T10:30:00Z"
}
```

#### List Athletes (with filtering & pagination)
```http
GET /api/v1/athletes/?position=Outside%20Hitter&is_active=true&skip=0&limit=10

Query Parameters:
- position: str (optional) - Filter by position
- is_active: bool (optional) - Filter by active status
- team: str (optional) - Filter by team
- skip: int (default: 0) - Pagination offset
- limit: int (default: 10) - Results per page

Response (200):
{
  "total": 25,
  "skip": 0,
  "limit": 10,
  "items": [
    { /* athlete object */ },
    { /* athlete object */ }
  ]
}
```

#### Update Athlete
```http
PATCH /api/v1/athletes/{athlete_id}
Content-Type: application/json

{
  "jersey_number": 15,
  "team": "National Team",
  "height_cm": 186
}

Response (200): Updated athlete object
```

#### Update Performance Stats (Atomic)
```http
PATCH /api/v1/athletes/{athlete_id}/performance
Content-Type: application/json

{
  "vertical_jump_cm": 85.5,
  "approach_jump_cm": 95.0,
  "spike_power_kmh": 110.5,
  "serve_power_kmh": 95.0,
  "hitting_rating": 9,
  "serving_rating": 8
}

Response (200): Updated athlete with new performance stats
```

#### Delete Athlete
```http
DELETE /api/v1/athletes/{athlete_id}

Response (204): No content
```

### Performance Stats Endpoints

#### Create Stats
```http
POST /api/v1/stats/
Content-Type: application/json

{
  "athlete_id": "507f1f77bcf86cd799439011",
  "season": "2025-2026",
  "matches_played": 15,
  "total_attacks": 250,
  "successful_attacks": 180,
  "attack_errors": 25,
  "aces": 45,
  "total_serves": 300,
  "service_errors": 15,
  "total_blocks": 75,
  "block_errors": 5,
  "total_digs": 120,
  "total_receptions": 95,
  "reception_errors": 8
}

Response (201): Created stats object with calculated percentages
```

#### Get Stats by Athlete
```http
GET /api/v1/stats/athlete/{athlete_id}?season=2025-2026

Query Parameters:
- season: str (optional) - Filter by season (e.g., "2025-2026")

Response (200):
[
  {
    "id": "...",
    "athlete_id": "507f1f77bcf86cd799439011",
    "season": "2025-2026",
    "matches_played": 15,
    "attack_percentage": 82.4,
    "serve_percentage": 95.0,
    "reception_percentage": 91.6,
    "created_at": "2026-02-08T10:30:00Z"
  }
]
```

#### Update Stats
```http
PATCH /api/v1/stats/{stats_id}
Content-Type: application/json

{
  "matches_played": 16,
  "aces": 48,
  "total_attacks": 260
}

Response (200): Updated stats object
```

### Story/Highlight Endpoints

#### Create Story
```http
POST /api/v1/stories/
Content-Type: application/json

{
  "athlete_id": "507f1f77bcf86cd799439011",
  "title": "Epic Match Performance",
  "description": "Highlights from the championship match",
  "media_url": "https://cloudinary.com/video.mp4",
  "media_type": "video",
  "tags": ["championship", "spike", "match-highlight"]
}

Response (201): Created story object
```

#### Get Active Stories
```http
GET /api/v1/stories/?limit=20

Query Parameters:
- athlete_id: str (optional) - Filter by athlete
- limit: int (default: 20) - Number of stories

Response (200):
[
  {
    "id": "...",
    "athlete_id": "507f1f77bcf86cd799439011",
    "title": "Epic Match Performance",
    "description": "Highlights from the championship match",
    "media_url": "https://cloudinary.com/video.mp4",
    "media_type": "video",
    "likes_count": 45,
    "claps_count": 23,
    "tags": ["championship", "spike"],
    "created_at": "2026-02-08T10:30:00Z"
  }
]
```

#### Like a Story
```http
POST /api/v1/stories/{story_id}/like
Content-Type: application/json

{
  "user_id": "user-123"
}

Response (200): Updated story with new like count
```

#### Clap for a Story
```http
POST /api/v1/stories/{story_id}/clap
Content-Type: application/json

{
  "user_id": "user-123"
}

Response (200): Updated story with new clap count
```

## 🔑 Key Features Explained

### Custom PyObjectId Type

The custom `PyObjectId` type seamlessly handles MongoDB's `ObjectId` ↔ string conversion:

```python
from app.models.py_object_id import PydanticObjectId

# In models
id: Optional[PydanticObjectId] = Field(default=None, alias="_id")

# MongoDB stores as ObjectId internally
# API returns and accepts as string JSON
```

### Atomic Performance Updates

Using MongoDB's `$set` operator for surgical updates—only modified fields are changed:

```python
# Only updates specified fields, leaves others untouched
await crud_athlete.update_performance(athlete_id, {
    "vertical_jump_cm": 90.0,
    "hitting_rating": 10
})
# Other performance fields remain unchanged
```

### Automatic Percentage Calculations

Stats responses automatically include calculated efficiency metrics:
- **Attack %**: `(successful_attacks - attack_errors) / total_attacks × 100`
- **Serve %**: `(total_serves - service_errors) / total_serves × 100`
- **Reception %**: `successful_receptions / (successful_receptions + reception_errors) × 100`

### Async All the Way

Every database operation and route uses `async/await` for non-blocking I/O:

```python
@router.get("/athletes/{athlete_id}")
async def get_athlete(athlete_id: str, db = Depends(get_database)):
    crud = CRUDAthlete(db)
    athlete = await crud.get(athlete_id)
    return athlete
```

### Dependency Injection

FastAPI's dependency system provides clean database access:

```python
async def get_database() -> AsyncIOMotorDatabase:
    return request.app.mongodb

@router.post("/athletes/")
async def create_athlete(
    data: AthleteCreate,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    crud = CRUDAthlete(db)
    return await crud.create(data)
```

## 📊 Data Models

### Athlete Model
```python
{
  "_id": ObjectId,           # MongoDB ID
  "first_name": str,
  "last_name": str,
  "email": str,              # Unique
  "phone": str,              # Optional
  "date_of_birth": datetime, # Optional
  "position": enum,          # Setter, Outside Hitter, etc.
  "height_cm": int,
  "weight_kg": float,        # Optional
  "jersey_number": int,
  "team": str,
  "is_active": bool,
  "performance_stats": {     # Nested document
    "vertical_jump_cm": float,
    "approach_jump_cm": float,
    "spike_power_kmh": float,
    "serve_power_kmh": float,
    "hitting_rating": int,   # 1-10
    "serving_rating": int,
    "passing_rating": int,
    "setting_rating": int,
    "blocking_rating": int,
    "defense_rating": int
  },
  "created_at": datetime,
  "updated_at": datetime
}
```

### Story Model
```python
{
  "_id": ObjectId,
  "athlete_id": ObjectId,    # Reference to athlete
  "title": str,
  "description": str,
  "media_url": str,          # Cloudinary or similar
  "media_type": str,         # "video", "image", "highlight"
  "tags": [str],
  "likes_count": int,        # Default 0
  "claps_count": int,        # Default 0
  "liked_by": [str],         # User IDs who liked
  "clapped_by": [str],       # User IDs who clapped
  "created_at": datetime,
  "updated_at": datetime
}
```

### Stats Model
```python
{
  "_id": ObjectId,
  "athlete_id": ObjectId,
  "season": str,             # e.g., "2025-2026"
  "matches_played": int,
  "total_attacks": int,
  "successful_attacks": int,
  "attack_errors": int,
  "aces": int,
  "total_serves": int,
  "service_errors": int,
  "total_blocks": int,
  "block_errors": int,
  "total_digs": int,
  "total_receptions": int,
  "reception_errors": int,
  "attack_percentage": float,    # Calculated
  "serve_percentage": float,     # Calculated
  "reception_percentage": float, # Calculated
  "created_at": datetime,
  "updated_at": datetime
}
```

## 🎨 Available Positions

- Setter
- Outside Hitter
- Middle Blocker
- Opposite
- Libero
- Defensive Specialist

## 🔒 Best Practices Implemented

✅ **Async/await** for non-blocking I/O  
✅ **Type hints** on all functions and variables  
✅ **Pydantic validation** for all request/response data  
✅ **Repository pattern** (CRUD) for separation of concerns  
✅ **Dependency injection** for clean code  
✅ **Atomic updates** with MongoDB `$set`  
✅ **ObjectId ↔ string** seamless conversion  
✅ **Response models** on all endpoints  
✅ **PEP 8** style guide compliance  
✅ **Error handling** with proper HTTP status codes  
✅ **CORS configuration** for frontend integration  
✅ **Environment variables** for sensitive config  
✅ **Lifespan management** for DB connect/disconnect  

## 🧪 Testing the API

### Using Swagger UI (Recommended)
1. Navigate to http://localhost:8000/docs
2. Click on any endpoint
3. Click "Try it out"
4. Fill in parameters and request body
5. Click "Execute"

### Using curl

```bash
# Create an athlete
curl -X POST "http://localhost:8000/api/v1/athletes/" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Alex",
    "last_name": "Rivera",
    "email": "alex.rivera@example.com",
    "position": "Setter",
    "height_cm": 180,
    "jersey_number": 5
  }'

# Get athlete by ID
curl "http://localhost:8000/api/v1/athletes/507f1f77bcf86cd799439011"

# List all athletes
curl "http://localhost:8000/api/v1/athletes/"

# Update performance stats
curl -X PATCH "http://localhost:8000/api/v1/athletes/507f1f77bcf86cd799439011/performance" \
  -H "Content-Type: application/json" \
  -d '{
    "vertical_jump_cm": 82.0,
    "setting_rating": 10,
    "passing_rating": 9
  }'
```

### Using Python requests

```python
import requests

BASE_URL = "http://localhost:8000/api/v1"

# Create athlete
response = requests.post(
    f"{BASE_URL}/athletes/",
    json={
        "first_name": "Maria",
        "last_name": "Santos",
        "email": "maria.santos@example.com",
        "position": "Libero",
        "height_cm": 168,
        "jersey_number": 8
    }
)
athlete = response.json()
athlete_id = athlete['id']
print(f"✅ Created athlete: {athlete_id}")

# Update performance stats
response = requests.patch(
    f"{BASE_URL}/athletes/{athlete_id}/performance",
    json={
        "defense_rating": 10,
        "passing_rating": 9,
        "agility_test_seconds": 4.2
    }
)
print(f"✅ Updated stats: {response.json()}")

# Get athlete with stats
response = requests.get(f"{BASE_URL}/athletes/{athlete_id}")
print(f"✅ Athlete profile: {response.json()}")
```

### Using JavaScript/Frontend

```javascript
const BASE_URL = "http://localhost:8000/api/v1";

// Create athlete
async function createAthlete(athleteData) {
  const response = await fetch(`${BASE_URL}/athletes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(athleteData)
  });
  return response.json();
}

// Get athlete
async function getAthlete(athleteId) {
  const response = await fetch(`${BASE_URL}/athletes/${athleteId}`);
  return response.json();
}

// Update performance stats
async function updateStats(athleteId, statsData) {
  const response = await fetch(`${BASE_URL}/athletes/${athleteId}/performance`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(statsData)
  });
  return response.json();
}

// Usage
(async () => {
  const athlete = await createAthlete({
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    position: "Outside Hitter",
    height_cm: 188,
    jersey_number: 7
  });
  console.log("Created:", athlete);
})();
