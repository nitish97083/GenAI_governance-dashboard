import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@app/services/api.service';
import { Faculty } from '@app/models/models';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="faculty-container">
      <section class="faculty-hero">
        <div class="container">
          <h1>Faculty Directory</h1>
          <p>Meet Our Distinguished Educators</p>
        </div>
      </section>

      <section class="faculty-content">
        <div class="container">
          <div class="faculty-grid">
            <div *ngFor="let member of faculty" class="faculty-card">
              <div class="faculty-image">👤</div>
              <h3>{{ member.name }}</h3>
              <p class="designation">{{ member.specialization }}</p>
              <p class="department">{{ member.qualification }}</p>
              <p class="experience">Experience: {{ member.experience }} years</p>
              <p class="contact">{{ member.email }}</p>
              <p class="contact">{{ member.phone }}</p>
              <p class="office">Office: {{ member.officeRoom }}</p>
              <p class="bio" *ngIf="member.bio">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {
  faculty: Faculty[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadFaculty();
  }

  loadFaculty(): void {
    this.apiService.getFaculty().subscribe(
      (response) => {
        if (response.success && response.data) {
          this.faculty = response.data;
        }
      },
      (error) => console.error('Error loading faculty:', error)
    );
  }
}
