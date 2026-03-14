# Governance Dashboard Backend

A Flask backend for the Governance Dashboard with AI-powered chat functionality.

## Features

- 🤖 **AI Chat Agent**: Conversational AI that can analyze ESG and DEI data
- 📊 **Data Ingestion**: Upload and process ESG, DEI, and initiatives data
- 📋 **Brief Generation**: Generate weekly governance briefs
- 🔍 **Anomaly Detection**: Automatically detect anomalies in metrics
- 🎯 **Initiative Analysis**: Deep analysis of specific initiatives

## Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the server:**
   ```bash
   python main.py
   ```

   The API will be available at `http://localhost:8000`

## API Endpoints

### Health & Status
- `GET /health` - Health check
- `GET /stats` - Dashboard statistics
- `GET /latest` - Latest brief timestamp

### AI Features
- `POST /chat` - AI chat with tool calling
- `GET /analyze/anomalies` - Detect anomalies
- `GET /analyze/initiative/{id}` - Analyze specific initiative

### Data Ingestion
- `POST /esg` - Upload ESG data (CSV/Excel)
- `POST /dei` - Upload DEI data (CSV/Excel)
- `POST /initiatives` - Upload initiatives data (CSV/Excel)
- `POST /notes` - Upload meeting notes (text)

### Brief Generation
- `POST /generate` - Generate weekly brief

## AI Agent Capabilities

The AI agent can:
- Query ESG and DEI metrics by organization unit
- Filter initiatives by status
- Detect anomalies in metrics data
- Analyze specific initiatives for risks and status
- Provide insights and recommendations

## Development

The backend uses:
- **Flask** for the web framework
- **Flask-CORS** for cross-origin requests
- Mock AI responses (ready for OpenAI integration)

## Mock Data

Currently uses mock data for demonstration. In production, integrate with:
- Database (PostgreSQL, MongoDB, etc.)
- Data warehouse for metrics
- Document storage for briefs and notes</content>
<parameter name="filePath">d:\TCAIHAC\governance-dashboard\backend\README.md