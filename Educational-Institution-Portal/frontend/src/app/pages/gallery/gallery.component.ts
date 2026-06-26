import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@app/services/api.service';
import { Gallery } from '@app/models/models';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gallery-container">
      <section class="gallery-hero">
        <div class="container">
          <h1>Gallery</h1>
          <p>Campus Life and Events</p>
        </div>
      </section>

      <section class="gallery-content">
        <div class="container">
          <div class="filter-buttons">
            <button (click)="filterCategory('')" [class.active]="!selectedCategory">All</button>
            <button (click)="filterCategory('event')" [class.active]="selectedCategory === 'event'">Events</button>
            <button (click)="filterCategory('campus')" [class.active]="selectedCategory === 'campus'">Campus</button>
            <button (click)="filterCategory('sports')" [class.active]="selectedCategory === 'sports'">Sports</button>
            <button (click)="filterCategory('activity')" [class.active]="selectedCategory === 'activity'">Activities</button>
          </div>

          <div class="gallery-grid">
            <div *ngFor="let item of filteredGallery" class="gallery-item">
              <div class="gallery-image">📷</div>
              <div class="gallery-overlay">
                <h3>{{ item.title }}</h3>
                <p class="category">{{ item.category }}</p>
                <p>{{ item.description }}</p>
                <p class="uploaded-by">Uploaded by: {{ item.uploadedBy }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  gallery: Gallery[] = [];
  filteredGallery: Gallery[] = [];
  selectedCategory = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadGallery();
  }

  loadGallery(): void {
    this.apiService.getGallery().subscribe(
      (response) => {
        if (response.success && response.data) {
          this.gallery = response.data;
          this.filteredGallery = this.gallery;
        }
      },
      (error) => console.error('Error loading gallery:', error)
    );
  }

  filterCategory(category: string): void {
    this.selectedCategory = category;
    if (category === '') {
      this.filteredGallery = this.gallery;
    } else {
      this.filteredGallery = this.gallery.filter(item => item.category === category);
    }
  }
}
