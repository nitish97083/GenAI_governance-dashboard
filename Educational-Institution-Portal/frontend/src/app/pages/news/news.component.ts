import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@app/services/api.service';
import { News } from '@app/models/models';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="news-container">
      <section class="news-hero">
        <div class="container">
          <h1>News & Updates</h1>
          <p>Stay Updated With the Latest From Our Institution</p>
        </div>
      </section>

      <section class="news-content">
        <div class="container">
          <div class="news-list">
            <article *ngFor="let article of news" class="news-article">
              <div class="article-header">
                <h2>{{ article.title }}</h2>
                <p class="published-date">{{ article.publishDate | date: 'MMMM d, y' }}</p>
                <p class="author">By {{ article.author }}</p>
              </div>
              <p class="article-content">{{ article.content }}</p>
              <div class="article-footer">
                <span class="category">{{ article.category }}</span>
                <span *ngIf="article.featured" class="featured">⭐ Featured</span>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: News[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.apiService.getNews().subscribe(
      (response) => {
        if (response.success && response.data) {
          this.news = response.data.sort((a, b) => 
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
          );
        }
      },
      (error) => console.error('Error loading news:', error)
    );
  }
}
