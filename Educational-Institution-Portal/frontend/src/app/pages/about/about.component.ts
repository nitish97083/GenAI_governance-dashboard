import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container">
      <section class="about-hero">
        <div class="container">
          <h1>About Our Institution</h1>
          <p>Excellence in Education Since 1990</p>
        </div>
      </section>

      <section class="about-content">
        <div class="container">
          <div class="about-grid">
            <div class="about-section">
              <h2>Our Vision</h2>
              <p>To be a leading educational institution that nurtures innovation, creativity, and 
              intellectual excellence while preparing students for meaningful contributions to society.</p>
            </div>
            <div class="about-section">
              <h2>Our Mission</h2>
              <p>To provide quality education through dedicated teaching, research, and service, 
              fostering an environment where students develop critical thinking and practical skills.</p>
            </div>
          </div>

          <div class="values-section">
            <h2>Our Core Values</h2>
            <div class="values-grid">
              <div class="value-card">
                <h3>Integrity</h3>
                <p>Upholding ethical standards in all endeavors</p>
              </div>
              <div class="value-card">
                <h3>Excellence</h3>
                <p>Striving for the highest standards in education</p>
              </div>
              <div class="value-card">
                <h3>Innovation</h3>
                <p>Embracing new ideas and methodologies</p>
              </div>
              <div class="value-card">
                <h3>Inclusivity</h3>
                <p>Creating opportunities for all students</p>
              </div>
            </div>
          </div>

          <div class="history-section">
            <h2>Our History</h2>
            <p>Founded in 1990, our institution has grown from a small college to a comprehensive 
            educational hub with state-of-the-art facilities. Over the past three decades, we have 
            educated thousands of students who have gone on to excel in various fields globally.</p>
            <p>Today, we continue to uphold our commitment to providing exceptional education and 
            fostering research that contributes to societal advancement.</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {}
