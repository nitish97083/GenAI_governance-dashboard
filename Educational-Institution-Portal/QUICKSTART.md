# Quick Start Guide - Educational Institution Portal

## Prerequisites Installation

Before running the project, ensure you have installed:

1. **Node.js & npm** (v18+)
   - Download: https://nodejs.org/
   - Verify: `node --version` & `npm --version`

2. **Oracle Database** (11g XE or later)
   - Download: https://www.oracle.com/database/technologies/xe-downloads.html
   - Verify database is running

3. **Angular CLI** (optional, for frontend development)
   ```bash
   npm install -g @angular/cli
   ```

## Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ../frontend
npm install
cd ..
```

### Step 2: Configure Backend (.env)

Edit `backend/.env` with your Oracle database credentials:

```env
DB_USER=system
DB_PASSWORD=your_oracle_password
DB_CONNECTION_STRING=localhost:1521/xe
PORT=3000
JWT_SECRET=change-this-in-production
```

### Step 3: Setup Database

Run the SQL scripts from `SETUP.md` → Database Setup section in your Oracle database.

### Step 4: Start the Application

#### Option A: Separate terminals (Recommended for development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

#### Option B: Single command (Windows)
```bash
start-dev.bat
```

#### Option C: Single command (Mac/Linux)
```bash
chmod +x start-dev.sh
./start-dev.sh
```

## Access the Application

- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:3000/api
- **API Documentation:** See Backend README for endpoint details

## Project Features

✅ User Authentication (Login/Register)
✅ Student Management
✅ Faculty Directory
✅ Course Listings
✅ Department Information
✅ News & Updates
✅ Image Gallery
✅ Contact Form
✅ Responsive Design

## Useful Commands

### Backend Commands
```bash
npm run dev          # Development mode with auto-reload
npm start            # Production mode
npm test             # Run tests (if configured)
```

### Frontend Commands
```bash
npm start            # Development server
ng build             # Production build
ng test              # Unit tests
ng lint              # Code linting
```

## Troubleshooting

### Issue: "Cannot connect to database"
- **Solution:** Check Oracle service is running and credentials in `.env` are correct

### Issue: "Port 3000/4200 already in use"
- **Solution:** Kill the process using the port or change the port in `.env`

### Issue: "Module not found" errors
- **Solution:** Delete `node_modules` folder and run `npm install` again

### Issue: CORS errors
- **Solution:** Ensure frontend URL matches `CORS_ORIGIN` in backend `.env`

## Next Steps

1. Read [SETUP.md](SETUP.md) for detailed configuration
2. Check `backend/README.md` for API documentation
3. Review `frontend/README.md` for frontend structure
4. Deploy to production (see SETUP.md for deployment guide)

## Support

For more information, see:
- [SETUP.md](SETUP.md) - Complete setup guide
- [backend/README.md](backend/README.md) - Backend documentation
- [frontend/README.md](frontend/README.md) - Frontend documentation

---

Happy Coding! 🚀
