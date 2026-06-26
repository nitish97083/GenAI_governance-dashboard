import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@app/services/api.service';
import { Course, Department } from '@app/models/models';

@Component({
  selector: 'app-academics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="academics-container">
      <section class="academics-hero">
        <div class="container">
          <h1>Academics</h1>
          <p>Explore Our Comprehensive Academic Programs</p>
        </div>
      </section>

      <section class="academics-content">
        <div class="container">
          <div class="content-grid">
            <div class="section">
              <h2>Departments</h2>
              <div class="departments-list">
                <div *ngFor="let dept of departments" class="dept-card">
                  <h3>{{ dept.departmentName }}</h3>
                  <p><strong>Head:</strong> {{ dept.headName }}</p>
                  <p><strong>Faculty:</strong> {{ dept.totalFaculty }}</p>
                  <p><strong>Students:</strong> {{ dept.totalStudents }}</p>
                  <p>{{ dept.description }}</p>
                </div>
              </div>
            </div>

            <div class="section">
              <h2>Featured Courses</h2>
              <div class="courses-list">
                <div *ngFor="let course of courses" class="course-card">
                  <h3>{{ course.courseName }}</h3>
                  <p><strong>Code:</strong> {{ course.courseCode }}</p>
                  <p><strong>Credits:</strong> {{ course.credits }}</p>
                  <p><strong>Semester:</strong> {{ course.semester }}</p>
                  <p>{{ course.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./academics.component.scss']
})
export class AcademicsComponent implements OnInit {
  departments: Department[] = [];
  courses: Course[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.loadCourses();
  }

  loadDepartments(): void {
    this.apiService.getDepartments().subscribe(
      (response) => {
        if (response.success && response.data) {
          this.departments = response.data.slice(0, 6);
        }
      },
      (error) => console.error('Error loading departments:', error)
    );
  }

  loadCourses(): void {
    this.apiService.getCourses().subscribe(
      (response) => {
        if (response.success && response.data) {
          this.courses = response.data.slice(0, 6);
        }
      },
      (error) => console.error('Error loading courses:', error)
    );
  }
}
