import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HealthResponse, LatestResponse } from '../../models/api.models';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="dashboard">
      <header class="page-header">
        <div>
          <h1>Governance Dashboard</h1>
          <p>Sustainability & DEI Insights at a Glance</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary" routerLink="/brief">
            <span class="material-icons">auto_awesome</span>
            Generate Brief
          </button>
        </div>
      </header>

      <!-- Status Cards -->
      <div class="grid grid-4 stats-grid">
        <div class="stat-card">
          <div class="stat-icon esg">
            <span class="material-icons">eco</span>
          </div>
          <div class="stat-content">
            <span class="stat-label">ESG Metrics</span>
            <span class="stat-value">{{ stats.esgMetrics }}</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon dei">
            <span class="material-icons">diversity_3</span>
          </div>
          <div class="stat-content">
            <span class="stat-label">DEI Metrics</span>
            <span class="stat-value">{{ stats.deiMetrics }}</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon initiatives">
            <span class="material-icons">assignment</span>
          </div>
          <div class="stat-content">
            <span class="stat-label">Active Initiatives</span>
            <span class="stat-value">{{ stats.initiatives }}</span>
          </div>
        </div>
        
        <div class="stat-card" [class.warning]="stats.overdueCount > 0">
          <div class="stat-icon overdue">
            <span class="material-icons">warning</span>
          </div>
          <div class="stat-content">
            <span class="stat-label">Overdue Items</span>
            <span class="stat-value">{{ stats.overdueCount }}</span>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="grid grid-2">
        <!-- API Status -->
        <div class="card">
          <div class="card-header">
            <h3>API Status</h3>
            <span class="badge" [class.badge-success]="health?.status === 'healthy'" 
                  [class.badge-danger]="health?.status !== 'healthy'">
              {{ health?.status || 'Checking...' }}
            </span>
          </div>
          <div class="features-list" *ngIf="health">
            <div class="feature-item" *ngFor="let feature of getFeatures()">
              <span class="material-icons" [class.active]="feature.enabled">
                {{ feature.enabled ? 'check_circle' : 'cancel' }}
              </span>
              <span>{{ feature.name }}</span>
            </div>
          </div>
          <div class="api-version" *ngIf="health">
            Version: {{ health.version }}
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card">
          <div class="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div class="quick-actions">
            <a routerLink="/data" class="action-btn">
              <span class="material-icons">upload_file</span>
              <span>Upload Data</span>
            </a>
            <a routerLink="/chat" class="action-btn">
              <span class="material-icons">smart_toy</span>
              <span>Ask AI Agent</span>
            </a>
            <a routerLink="/initiatives" class="action-btn">
              <span class="material-icons">flag</span>
              <span>View Initiatives</span>
            </a>
            <button class="action-btn" (click)="detectAnomalies()">
              <span class="material-icons">troubleshoot</span>
              <span>Detect Anomalies</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Last Brief -->
      <div class="card">
        <div class="card-header">
          <h3>Latest Executive Brief</h3>
          <a routerLink="/brief" class="btn btn-secondary">View All Briefs</a>
        </div>
        <div class="last-brief-info" *ngIf="latestBrief">
          <span class="material-icons">schedule</span>
          <span>Last generated: {{ latestBrief | date:'medium' }}</span>
        </div>
        <div class="last-brief-info" *ngIf="!latestBrief">
          <span class="material-icons">info</span>
          <span>No briefs generated yet. Upload data and generate your first brief!</span>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .dashboard {
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      
      h1 {
        font-size: 28px;
        font-weight: 700;
        color: var(--gray-900);
      }
      
      p {
        color: var(--gray-500);
        margin-top: 4px;
      }
    }
    
    .stats-grid {
      margin-bottom: 24px;
    }
    
    .stat-card {
      background: white;
      border-radius: var(--radius-lg);
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: var(--shadow);
      
      &.warning {
        border-left: 4px solid var(--warning);
      }
    }
    
    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .material-icons {
        font-size: 24px;
        color: white;
      }
      
      &.esg { background: linear-gradient(135deg, #10b981, #059669); }
      &.dei { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
      &.initiatives { background: linear-gradient(135deg, #3b82f6, #2563eb); }
      &.overdue { background: linear-gradient(135deg, #f59e0b, #d97706); }
    }
    
    .stat-content {
      display: flex;
      flex-direction: column;
    }
    
    .stat-label {
      font-size: 13px;
      color: var(--gray-500);
    }
    
    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: var(--gray-900);
    }
    
    .features-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .feature-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      
      .material-icons {
        font-size: 20px;
        color: var(--gray-400);
        
        &.active {
          color: var(--secondary);
        }
      }
    }
    
    .api-version {
      font-size: 12px;
      color: var(--gray-400);
      padding-top: 12px;
      border-top: 1px solid var(--gray-100);
    }
    
    .quick-actions {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    
    .action-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 20px;
      background: var(--gray-50);
      border: 1px solid var(--gray-200);
      border-radius: var(--radius);
      text-decoration: none;
      color: var(--gray-700);
      cursor: pointer;
      transition: all 0.2s;
      
      .material-icons {
        font-size: 28px;
        color: var(--primary);
      }
      
      &:hover {
        background: white;
        border-color: var(--primary);
        box-shadow: var(--shadow-md);
      }
    }
    
    .last-brief-info {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--gray-600);
      
      .material-icons {
        color: var(--gray-400);
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
    health: HealthResponse | null = null;
    latestBrief: string | null = null;

    stats = {
        esgMetrics: 0,
        deiMetrics: 0,
        initiatives: 0,
        overdueCount: 0
    };

    constructor(private api: ApiService) { }

    ngOnInit() {
        this.loadHealth();
        this.loadLatest();
        this.loadStats();
    }

    loadHealth() {
        this.api.getHealth().subscribe({
            next: (health) => this.health = health,
            error: () => this.health = null
        });
    }

    loadStats() {
        this.api.getStats().subscribe({
            next: (stats) => {
                this.stats = {
                    esgMetrics: stats.esg_metrics,
                    deiMetrics: stats.dei_metrics,
                    initiatives: stats.initiatives,
                    overdueCount: stats.overdue_count
                };
            },
            error: () => {
                // Keep default zeros on error
            }
        });
    }

    loadLatest() {
        this.api.getLatest().subscribe({
            next: (latest) => this.latestBrief = latest.last_brief_generated,
            error: () => this.latestBrief = null
        });
    }

    getFeatures() {
        if (!this.health) return [];
        return [
            { name: 'Deterministic Briefs', enabled: this.health.features.deterministic_briefs },
            { name: 'AI-Powered Briefs', enabled: this.health.features.ai_briefs },
            { name: 'Conversational Chat', enabled: this.health.features.chat },
            { name: 'RAG (Vector Search)', enabled: this.health.features.rag },
            { name: 'Anomaly Detection', enabled: this.health.features.anomaly_detection }
        ];
    }

    detectAnomalies() {
        // Navigate to chat with anomaly detection query
        window.location.href = '/chat?query=detect+anomalies';
    }
}
