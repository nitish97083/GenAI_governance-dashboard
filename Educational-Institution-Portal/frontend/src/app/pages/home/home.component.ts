import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1>Welcome to Our Educational Institution</h1>
          <p>Empowering Students for a Bright Future</p>
          <div class="hero-buttons">
            <button class="btn btn-primary" routerLink="/admissions">Apply Now</button>
            <button class="btn btn-secondary" routerLink="/about">Learn More</button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="container">
          <h2>Why Choose Us?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🎓</div>
              <h3>Expert Faculty</h3>
              <p>Learn from experienced and dedicated educators</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📚</div>
              <h3>Quality Education</h3>
              <p>Comprehensive curriculum with modern teaching methods</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🏆</div>
              <h3>Excellence</h3>
              <p>Consistently achieving academic excellence</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">💼</div>
              <h3>Career Ready</h3>
              <p>Preparing students for successful careers</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Latest News -->
      <section class="latest-news">
        <div class="container">
          <h2>Latest News</h2>
          <div class="news-grid">
            <div class="news-card">
              <div class="news-date">May 21, 2024</div>
              <h3>New Campus Facilities Inaugurated</h3>
              <p>State-of-the-art laboratories and smart classrooms now open for students.</p>
              <a routerLink="/news" class="read-more">Read More →</a>
            </div>
            <div class="news-card">
              <div class="news-date">May 15, 2024</div>
              <h3>Annual Sports Meet Announced</h3>
              <p>Exciting sporting events planned for the upcoming season.</p>
              <a routerLink="/news" class="read-more">Read More →</a>
            </div>
            <div class="news-card">
              <div class="news-date">May 10, 2024</div>
              <h3>Scholarship Program Launched</h3>
              <p>New scholarship opportunities for deserving students.</p>
              <a routerLink="/news" class="read-more">Read More →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Statistics -->
      <section class="statistics">
        <div class="container">
          <div class="stat-box">
            <div class="stat-number">5000+</div>
            <div class="stat-label">Students</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">200+</div>
            <div class="stat-label">Faculty Members</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">50+</div>
            <div class="stat-label">Courses</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">10+</div>
            <div class="stat-label">Departments</div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
