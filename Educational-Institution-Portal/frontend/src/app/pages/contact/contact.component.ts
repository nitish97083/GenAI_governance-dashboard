import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { ContactMessage } from '@app/models/models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-container">
      <section class="contact-hero">
        <div class="container">
          <h1>Contact Us</h1>
          <p>We'd Love to Hear From You</p>
        </div>
      </section>

      <section class="contact-content">
        <div class="container">
          <div class="contact-grid">
            <div class="contact-info">
              <h2>Get in Touch</h2>
              <div class="info-item">
                <h3>📍 Address</h3>
                <p>123 Education Lane<br>City, State 12345<br>Country</p>
              </div>
              <div class="info-item">
                <h3>📞 Phone</h3>
                <p>+1 (555) 123-4567<br>+1 (555) 987-6543</p>
              </div>
              <div class="info-item">
                <h3>✉️ Email</h3>
                <p>info@institution.edu<br>support@institution.edu</p>
              </div>
              <div class="info-item">
                <h3>⏰ Office Hours</h3>
                <p>Monday - Friday: 9:00 AM - 5:00 PM<br>Saturday: 10:00 AM - 2:00 PM<br>Sunday: Closed</p>
              </div>
            </div>

            <div class="contact-form">
              <h2>Send us a Message</h2>
              <form (ngSubmit)="submitMessage()" #contactForm="ngForm">
                <div class="form-group">
                  <label>Name</label>
                  <input type="text" [(ngModel)]="message.name" name="name" required>
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" [(ngModel)]="message.email" name="email" required>
                </div>
                <div class="form-group">
                  <label>Phone</label>
                  <input type="tel" [(ngModel)]="message.phone" name="phone" required>
                </div>
                <div class="form-group">
                  <label>Subject</label>
                  <input type="text" [(ngModel)]="message.subject" name="subject" required>
                </div>
                <div class="form-group">
                  <label>Message</label>
                  <textarea [(ngModel)]="message.message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Send Message</button>
                <p *ngIf="successMessage" class="success-message">{{ successMessage }}</p>
                <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  message: ContactMessage = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    status: 'new'
  };
  successMessage = '';
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  submitMessage(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.apiService.sendContactMessage(this.message).subscribe(
      (response) => {
        if (response.success) {
          this.successMessage = 'Message sent successfully! We will get back to you soon.';
          this.resetForm();
        }
      },
      (error) => {
        this.errorMessage = 'Failed to send message. Please try again.';
      }
    );
  }

  resetForm(): void {
    this.message = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      status: 'new'
    };
  }
}
