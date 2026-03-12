// API Response Models

export interface HealthResponse {
    status: string;
    version: string;
    features: {
        deterministic_briefs: boolean;
        ai_briefs: boolean;
        chat: boolean;
        rag: boolean;
        anomaly_detection: boolean;
    };
}

export interface UploadResponse {
    status: string;
    ingested_rows?: number;
    note_id?: number;
}

export interface BriefResponse {
    status: string;
    brief: string;
    tool_calls?: ToolCall[];
    iterations?: number;
    mode: 'deterministic' | 'ai';
}

export interface ChatRequest {
    question: string;
}

export interface ChatResponse {
    success: boolean;
    response: string;
    tool_calls: ToolCall[];
    iterations: number;
    error?: string;
}

export interface ToolCall {
    tool: string;
    arguments: Record<string, unknown>;
    result_summary: string;
}

export interface LatestResponse {
    last_brief_generated: string | null;
}

export interface Initiative {
    id: string;
    name: string;
    owner: string;
    pillar: string;
    status: string;
    due_date: string | null;
    last_update: string | null;
    is_overdue?: boolean;
}

export interface Metric {
    id: number;
    source: 'esg' | 'dei';
    date: string;
    org_unit: string;
    metric_name: string;
    value: number;
    unit: string;
}

export interface AnalysisResponse {
    success: boolean;
    response: string;
    tool_calls: ToolCall[];
    iterations: number;
}

export interface AnomalyResponse {
    success: boolean;
    response: string;
    tool_calls: ToolCall[];
}
