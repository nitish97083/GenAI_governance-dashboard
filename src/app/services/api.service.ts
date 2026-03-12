import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    HealthResponse,
    UploadResponse,
    BriefResponse,
    ChatRequest,
    ChatResponse,
    LatestResponse,
    AnalysisResponse,
    AnomalyResponse
} from '../models/api.models';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = '/api';

    constructor(private http: HttpClient) { }

    // Health check
    getHealth(): Observable<HealthResponse> {
        return this.http.get<HealthResponse>(`${this.baseUrl}/health`);
    }

    // Dashboard stats
    getStats(): Observable<{ esg_metrics: number; dei_metrics: number; initiatives: number; overdue_count: number }> {
        return this.http.get<{ esg_metrics: number; dei_metrics: number; initiatives: number; overdue_count: number }>(`${this.baseUrl}/stats`);
    }

    // Latest brief timestamp
    getLatest(): Observable<LatestResponse> {
        return this.http.get<LatestResponse>(`${this.baseUrl}/latest`);
    }

    // Data Ingestion
    uploadESG(file: File): Observable<UploadResponse> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<UploadResponse>(`${this.baseUrl}/esg`, formData);
    }

    uploadDEI(file: File): Observable<UploadResponse> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<UploadResponse>(`${this.baseUrl}/dei`, formData);
    }

    uploadInitiatives(file: File): Observable<UploadResponse> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<UploadResponse>(`${this.baseUrl}/initiatives`, formData);
    }

    uploadNotes(text: string, source: string = 'meeting_notes.txt'): Observable<UploadResponse> {
        const formData = new FormData();
        formData.append('text', text);
        formData.append('source', source);
        return this.http.post<UploadResponse>(`${this.baseUrl}/notes`, formData);
    }

    // Brief Generation
    generateBrief(weekStart: string, useAI: boolean = false): Observable<BriefResponse> {
        return this.http.post<BriefResponse>(
            `${this.baseUrl}/generate?week_start=${weekStart}&use_ai=${useAI}`,
            {}
        );
    }

    // Agentic AI - Chat
    chat(question: string): Observable<ChatResponse> {
        const request: ChatRequest = { question };
        return this.http.post<ChatResponse>(`${this.baseUrl}/chat`, request);
    }

    // Agentic AI - Analyze Initiative
    analyzeInitiative(initiativeId: string): Observable<AnalysisResponse> {
        return this.http.get<AnalysisResponse>(`${this.baseUrl}/analyze/initiative/${initiativeId}`);
    }

    // Agentic AI - Detect Anomalies
    detectAnomalies(): Observable<AnomalyResponse> {
        return this.http.get<AnomalyResponse>(`${this.baseUrl}/analyze/anomalies`);
    }
}
