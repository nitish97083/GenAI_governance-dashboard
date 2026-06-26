import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { User } from '@app/models/models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="register-container">
      <section class="register-content">
        <div class="register-box">
          <h1>Register</h1>
          <p>Create Your Account</p>
          
          <form (ngSubmit)="register()" #registerForm="ngForm">
            <div class="form-row">
              <div class="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  [(ngModel)]="user.name" 
                  name="name" 
                  required 
                  placeholder="Your name"
                >
              </div>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input 
                type="email" 
                [(ngModel)]="user.email" 
                name="email" 
                required 
                placeholder="Your email"
              >
            </div>

            <div class="form-group">
              <label>Phone</label>
              <input 
                type="tel" 
                [(ngModel)]="user.phone" 
                name="phone" 
                required 
                placeholder="Your phone"
              >
            </div>

            <div class="form-group">
              <label>Password</label>
              <input 
                type="password" 
                [(ngModel)]="user.password" 
                name="password" 
                required 
                placeholder="Create password"
              >
            </div>

            <div class="form-group">
              <label>Role</label>
              <select [(ngModel)]="user.role" name="role" required>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="parent">Parent</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary" [disabled]="loading">
              {{ loading ? 'Registering...' : 'Register' }}
            </button>

            <p *ngIf="successMessage" class="success-message">{{ successMessage }}</p>
            <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
          </form>

          <p class="login-link">
            Already have an account? <a routerLink="/login">Login here</a>
          </p>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: User = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'student'
  };
  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  register(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;

    this.apiService.register(this.user).subscribe(
      (response) => {
        if (response.success) {
          this.successMessage = 'Registration successful! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Registration failed. Please check your details and try again.';
        this.loading = false;
      }
    );
  }
}
