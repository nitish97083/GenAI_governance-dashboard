import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <section class="login-content">
        <div class="login-box">
          <h1>Login</h1>
          <p>Access Your Account</p>
          
          <form (ngSubmit)="login()" #loginForm="ngForm">
            <div class="form-group">
              <label>Email</label>
              <input 
                type="email" 
                [(ngModel)]="credentials.email" 
                name="email" 
                required 
                placeholder="Enter your email"
              >
            </div>
            
            <div class="form-group">
              <label>Password</label>
              <input 
                type="password" 
                [(ngModel)]="credentials.password" 
                name="password" 
                required 
                placeholder="Enter your password"
              >
            </div>

            <button type="submit" class="btn btn-primary" [disabled]="loading">
              {{ loading ? 'Logging in...' : 'Login' }}
            </button>

            <p *ngIf="successMessage" class="success-message">{{ successMessage }}</p>
            <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
          </form>

          <p class="signup-link">
            Don't have an account? <a routerLink="/register">Sign up here</a>
          </p>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  login(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;

    this.apiService.login(this.credentials.email, this.credentials.password).subscribe(
      (response) => {
        if (response.success && response.token) {
          localStorage.setItem('token', response.token);
          if (response.user) {
            this.apiService.setCurrentUser(response.user);
          }
          this.successMessage = 'Login successful!';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        }
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Invalid email or password';
        this.loading = false;
      }
    );
  }
}
