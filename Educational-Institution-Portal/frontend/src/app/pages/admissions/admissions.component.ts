import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { Admission } from '@app/models/models';

@Component({
  selector: 'app-admissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admissions-container">
      <section class="admissions-hero">
        <div class="container">
          <h1>Admissions</h1>
          <p>Begin Your Journey With Us</p>
        </div>
      </section>

      <section class="admissions-content">
        <div class="container">
          <div class="admissions-grid">
            <div class="info-section">
              <h2>Admission Process</h2>
              <div class="process-steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <h3>Submit Application</h3>
                  <p>Fill out the admission form with your details</p>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <h3>Entrance Exam</h3>
                  <p>Take the entrance examination</p>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <h3>Interview</h3>
                  <p>Participate in the interview round</p>
                </div>
                <div class="step">
                  <div class="step-number">4</div>
                  <h3>Enrollment</h3>
                  <p>Complete the enrollment process</p>
                </div>
              </div>
            </div>

            <div class="form-section">
              <h2>Apply Now</h2>
              <form (ngSubmit)="submitAdmission()" #admissionForm="ngForm">
                <div class="form-group">
                  <label>First Name</label>
                  <input type="text" [(ngModel)]="admission.firstName" name="firstName" required>
                </div>
                <div class="form-group">
                  <label>Last Name</label>
                  <input type="text" [(ngModel)]="admission.lastName" name="lastName" required>
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" [(ngModel)]="admission.email" name="email" required>
                </div>
                <div class="form-group">
                  <label>Phone</label>
                  <input type="tel" [(ngModel)]="admission.phone" name="phone" required>
                </div>
                <div class="form-group">
                  <label>Date of Birth</label>
                  <input type="date" [(ngModel)]="admission.dateOfBirth" name="dob" required>
                </div>
                <div class="form-group">
                  <label>Qualifications</label>
                  <textarea [(ngModel)]="admission.qualifications" name="qualifications" rows="3" required></textarea>
                </div>
                <div class="form-group">
                  <label>Preferred Department</label>
                  <select [(ngModel)]="admission.preferredDepartment" name="department" required>
                    <option value="">Select Department</option>
                    <option value="1">Engineering</option>
                    <option value="2">Science</option>
                    <option value="3">Commerce</option>
                    <option value="4">Arts</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Submit Application</button>
                <p *ngIf="successMessage" class="success-message">{{ successMessage }}</p>
                <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./admissions.component.scss']
})
export class AdmissionsComponent {
  admission: Admission = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: new Date(),
    qualifications: '',
    preferredDepartment: 0,
    applicationDate: new Date(),
    status: 'pending',
    marks: 0
  };
  successMessage = '';
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  submitAdmission(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.apiService.createAdmission(this.admission).subscribe(
      (response) => {
        if (response.success) {
          this.successMessage = 'Application submitted successfully!';
          this.resetForm();
        }
      },
      (error) => {
        this.errorMessage = 'Failed to submit application. Please try again.';
      }
    );
  }

  resetForm(): void {
    this.admission = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: new Date(),
      qualifications: '',
      preferredDepartment: 0,
      applicationDate: new Date(),
      status: 'pending',
      marks: 0
    };
  }
}
