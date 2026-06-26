import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@app/services/api.service';
import { User } from '@app/models/models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-container">
      <section class="admin-header">
        <div class="container">
          <h1>Admin Dashboard</h1>
          <div class="admin-info">
            <p>Welcome, {{ currentUser?.name }}</p>
            <button (click)="logout()" class="btn btn-secondary">Logout</button>
          </div>
        </div>
      </section>

      <section class="admin-content">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-card">
              <h3>Total Students</h3>
              <p class="number">5000+</p>
            </div>
            <div class="stat-card">
              <h3>Total Faculty</h3>
              <p class="number">200+</p>
            </div>
            <div class="stat-card">
              <h3>Total Courses</h3>
              <p class="number">50+</p>
            </div>
            <div class="stat-card">
              <h3>Departments</h3>
              <p class="number">10+</p>
            </div>
          </div>

          <div class="admin-sections">
            <div class="section">
              <h2>Management Options</h2>
              <div class="options-grid">
                <button class="option-btn">
                  <span class="icon">👥</span>
                  <span>Manage Students</span>
                </button>
                <button class="option-btn">
                  <span class="icon">👨‍🏫</span>
                  <span>Manage Faculty</span>
                </button>
                <button class="option-btn">
                  <span class="icon">📚</span>
                  <span>Manage Courses</span>
                </button>
                <button class="option-btn">
                  <span class="icon">🏢</span>
                  <span>Manage Departments</span>
                </button>
                <button class="option-btn">
                  <span class="icon">📝</span>
                  <span>Manage Admissions</span>
                </button>
                <button class="option-btn">
                  <span class="icon">📰</span>
                  <span>Manage News</span>
                </button>
                <button class="option-btn">
                  <span class="icon">🖼️</span>
                  <span>Manage Gallery</span>
                </button>
                <button class="option-btn">
                  <span class="icon">📧</span>
                  <span>View Messages</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.currentUser = this.apiService.getCurrentUser();
    if (!this.currentUser) {
      this.checkIfAdmin();
    }
  }

  checkIfAdmin(): void {
    this.apiService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.apiService.logout();
    window.location.href = '/';
  }
}
