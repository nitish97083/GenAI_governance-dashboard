# Governance Dashboard

Angular frontend for the Sustainability + DEI Governance Insights Agent with AI-powered chat capabilities.

## Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Configure OpenAI API Key:
   - Copy `.env` and add your OpenAI API key:
   ```bash
   OPENAI_API_KEY=your_actual_api_key_here
   ```

4. Start the FastAPI backend:
```bash
python main.py
```

The backend will run on http://localhost:8000

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server (with proxy to FastAPI backend):
```bash
npm start
```

3. Open http://localhost:4200

## Prerequisites

- Python 3.8+
- Node.js 18+
- OpenAI API key (for AI chat functionality)

## Features

- **Dashboard** - Overview of governance metrics and status
- **Data Ingestion** - Upload ESG, DEI, Initiatives CSVs and meeting notes
- **Weekly Brief** - Generate deterministic or AI-powered executive briefs
- **AI Chat** - Conversational interface to query governance data
- **Initiatives** - Track and analyze sustainability/DEI initiatives

## Tech Stack

### Frontend
- Angular 17 (Standalone Components)
- Chart.js for visualizations
- Material Icons
- SCSS styling

### Backend
- **Flask** (Python web framework)
- **Flask-CORS** for cross-origin requests
- Mock AI responses (ready for OpenAI integration)
