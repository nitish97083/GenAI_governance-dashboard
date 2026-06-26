import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="forgot-password-container">
      <section class="forgot-password-content">
        <div class="forgot-password-box">
          <h1>Forgot Password</h1>
          <p>If you have forgotten your password, please contact the site administrator or use the reset process provided by your institution.</p>
          <p class="info-note">Currently this app does not support automatic password reset emails. Please ask your administrator to reset your account password.</p>
          <p>
            Remembered it? <a routerLink="/login">Return to login</a>
          </p>
        </div>
      </section>
    </div>
  `,
  styles: [
    `.forgot-password-container { padding: 24px; }`
  ]
})
export class ForgotPasswordComponent {}
