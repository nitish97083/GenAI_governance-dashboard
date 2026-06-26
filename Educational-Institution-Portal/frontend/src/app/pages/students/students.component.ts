import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@app/services/api.service';
import { Student } from '@app/models/models';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="students-container">
      <section class="students-hero">
        <div class="container">
          <h1>Student Portal</h1>
          <p>Excellence in Student Development</p>
        </div>
      </section>

      <section class="students-content">
        <div class="container">
          <div class="info-cards">
            <div class="card">
              <h3>📖 Academics</h3>
              <p>Access course materials, assignments, and grades</p>
            </div>
            <div class="card">
              <h3>💼 Placements</h3>
              <p>Prepare for your career with our placement program</p>
            </div>
            <div class="card">
              <h3>🎓 Scholarships</h3>
              <p>Explore available scholarship opportunities</p>
            </div>
            <div class="card">
              <h3>🌟 Activities</h3>
              <p>Participate in campus activities and events</p>
            </div>
          </div>

          <div class="student-list-section">
            <h2>Student Directory</h2>
            <div class="student-grid">
              <div *ngFor="let student of students" class="student-card">
                <h3>Enrollment: {{ student.enrollmentNumber }}</h3>
                <p><strong>Semester:</strong> {{ student.semesterNumber }}</p>
                <p><strong>Status:</strong> <span [class]="'status-' + student.status">{{ student.status }}</span></p>
                <p *ngIf="student.gpa"><strong>GPA:</strong> {{ student.gpa }}</p>
                <p><strong>Admission Date:</strong> {{ student.dateOfAdmission | date }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.apiService.getStudents().subscribe(
      (response) => {
        if (response.success && response.data) {
          this.students = response.data.slice(0, 12);
        }
      },
      (error) => console.error('Error loading students:', error)
    );
  }
}
