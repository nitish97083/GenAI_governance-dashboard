from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for Angular frontend
CORS(app, origins=["http://localhost:4200"])

# Mock data
mock_data = {
    "esg_metrics": [
        {"id": 1, "source": "esg", "date": "2024-01-15", "org_unit": "Global", "metric_name": "Carbon Emissions", "value": 1500.5, "unit": "tons CO2"},
        {"id": 2, "source": "esg", "date": "2024-01-15", "org_unit": "Global", "metric_name": "Energy Consumption", "value": 25000.0, "unit": "kWh"},
        {"id": 3, "source": "esg", "date": "2024-01-15", "org_unit": "Global", "metric_name": "Water Usage", "value": 5000.0, "unit": "liters"},
    ],
    "dei_metrics": [
        {"id": 1, "source": "dei", "date": "2024-01-15", "org_unit": "Global", "metric_name": "Diversity Index", "value": 0.75, "unit": "ratio"},
        {"id": 2, "source": "dei", "date": "2024-01-15", "org_unit": "Global", "metric_name": "Employee Satisfaction", "value": 4.2, "unit": "score"},
        {"id": 3, "source": "dei", "date": "2024-01-15", "org_unit": "Global", "metric_name": "Retention Rate", "value": 0.85, "unit": "percentage"},
    ],
    "initiatives": [
        {"id": "INIT-1", "name": "Reduce Carbon Footprint", "owner": "John Doe", "pillar": "ESG", "status": "In Progress", "due_date": "2024-03-01", "last_update": "2024-01-10"},
        {"id": "INIT-2", "name": "Improve DEI Training", "owner": "Jane Smith", "pillar": "DEI", "status": "At Risk", "due_date": "2024-02-15", "last_update": "2024-01-05"},
        {"id": "INIT-3", "name": "Sustainable Supply Chain", "owner": "Bob Johnson", "pillar": "ESG", "status": "Completed", "due_date": "2024-01-30", "last_update": "2024-01-25"},
    ]
}

# AI Agent function - Mock implementation
def process_with_ai_agent(question):
    """Process user question using mock AI responses"""

    question_lower = question.lower()

    if "anomal" in question_lower:
        response_text = """I found 2 anomalies in the ESG metrics:

1. **Carbon Emissions**: 1,500.5 tons CO2 (significantly above normal range)
2. **Energy Consumption**: 25,000 kWh (higher than expected)

These values exceed typical thresholds and should be investigated."""
    elif "overdue" in question_lower or "risk" in question_lower:
        response_text = """Currently, **INIT-2: Improve DEI Training** is at risk and overdue. The initiative was due on 2024-02-15 but is still in progress. I recommend immediate attention to get it back on track."""
    elif "esg" in question_lower and "trend" in question_lower:
        response_text = """ESG metric trends show:

- **Carbon Emissions**: Stable at 1,500 tons CO2
- **Energy Consumption**: Trending upward (+5% from last month)
- **Water Usage**: Decreased by 10% (positive trend)

Overall ESG performance is within acceptable ranges."""
    elif "dei" in question_lower:
        response_text = """DEI metrics summary:

- **Diversity Index**: 0.75 (good)
- **Employee Satisfaction**: 4.2/5 (excellent)
- **Retention Rate**: 85% (above industry average)

The DEI training initiative (INIT-2) needs attention to maintain these positive trends."""
    elif "init" in question_lower and ("2" in question_lower or "at risk" in question_lower):
        response_text = """**INIT-2: Improve DEI Training**
- **Status**: At Risk ⚠️
- **Owner**: Jane Smith
- **Due Date**: February 15, 2024 (OVERDUE)
- **Last Update**: January 5, 2024

This initiative is overdue and needs immediate attention. Consider reallocating resources or adjusting the timeline."""
    else:
        response_text = f"""I understand you're asking about: '{question}'

I can help you analyze ESG metrics, DEI data, initiatives status, detect anomalies, and provide insights about your governance data.

Try asking:
- "What are the top ESG risks this week?"
- "Show me overdue initiatives"
- "Analyze DEI trends"
- "Why is INIT-2 at risk?"
- "Detect any anomalies in metrics\""""

    return {
        "success": True,
        "response": response_text,
        "tool_calls": [
            {"tool": "analyze_query", "arguments": {"query": question}, "result_summary": "Processed user query"}
        ],
        "iterations": 1
    }

# API Routes
@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "version": "1.0.0",
        "features": {
            "deterministic_briefs": True,
            "ai_briefs": True,
            "chat": True,
            "rag": False,
            "anomaly_detection": True
        }
    })

@app.route("/stats", methods=["GET"])
def get_stats():
    """Get dashboard statistics"""
    return jsonify({
        "esg_metrics": 3,
        "dei_metrics": 3,
        "initiatives": 3,
        "overdue_count": 1
    })

@app.route("/latest", methods=["GET"])
def get_latest():
    """Get latest brief timestamp"""
    return jsonify({
        "last_brief_generated": "2024-01-15T10:00:00Z"
    })

@app.route("/chat", methods=["POST"])
def chat_endpoint():
    """AI Chat endpoint"""
    data = request.get_json()
    if not data or "question" not in data:
        return jsonify({"error": "Question is required"}), 400

    result = process_with_ai_agent(data["question"])
    return jsonify(result)

@app.route("/analyze/anomalies", methods=["GET"])
def detect_anomalies_endpoint():
    """Detect anomalies in data"""
    return jsonify({
        "success": True,
        "response": "Found 2 anomalies in the metrics data.",
        "tool_calls": [{"tool": "detect_anomalies", "arguments": {}, "result_summary": "Found 2 anomalies"}],
        "iterations": 1
    })

@app.route("/analyze/initiative/<initiative_id>", methods=["GET"])
def analyze_initiative_endpoint(initiative_id):
    """Analyze a specific initiative"""
    if initiative_id == "INIT-2":
        response_text = """**INIT-2: Improve DEI Training**
- **Status**: At Risk ⚠️
- **Owner**: Jane Smith
- **Due Date**: February 15, 2024 (OVERDUE)
- **Last Update**: January 5, 2024

This initiative is overdue and needs immediate attention."""
    else:
        response_text = f"Initiative {initiative_id} analysis not available in mock data."

    return jsonify({
        "success": True,
        "response": response_text,
        "tool_calls": [{"tool": "analyze_initiative", "arguments": {"initiative_id": initiative_id}, "result_summary": f"Analyzed {initiative_id}"}],
        "iterations": 1
    })

# File upload endpoints (mock implementations)
@app.route("/esg", methods=["POST"])
def upload_esg():
    """Upload ESG data"""
    return jsonify({"status": "success", "ingested_rows": 100})

@app.route("/dei", methods=["POST"])
def upload_dei():
    """Upload DEI data"""
    return jsonify({"status": "success", "ingested_rows": 50})

@app.route("/initiatives", methods=["POST"])
def upload_initiatives():
    """Upload initiatives data"""
    return jsonify({"status": "success", "ingested_rows": 25})

@app.route("/notes", methods=["POST"])
def upload_notes():
    """Upload meeting notes"""
    return jsonify({"status": "success", "note_id": 1})

@app.route("/generate", methods=["POST"])
def generate_brief():
    """Generate weekly brief"""
    brief_content = """
# Weekly Governance Brief

## ESG Metrics Summary
- Carbon Emissions: 1,500.5 tons CO2
- Energy Consumption: 25,000 kWh
- Water Usage: 5,000 liters

## DEI Metrics Summary
- Diversity Index: 0.75
- Employee Satisfaction: 4.2/5
- Retention Rate: 85%

## Key Initiatives
- INIT-1: Reduce Carbon Footprint (In Progress)
- INIT-2: Improve DEI Training (At Risk) ⚠️
- INIT-3: Sustainable Supply Chain (Completed)

## Recommendations
1. Focus on INIT-2 which is at risk
2. Monitor carbon emissions trends
3. Continue DEI improvement efforts
"""

    return jsonify({
        "status": "success",
        "brief": brief_content,
        "tool_calls": [],
        "iterations": 1,
        "mode": "deterministic"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)