import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header>
      <div class="header-container">
        <div class="logo">
          <span routerLink="/home">📚 EduPortal</span>
        </div>
        <nav>
          <ul>
            <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
            <li><a routerLink="/about" routerLinkActive="active">About</a></li>
            <li><a routerLink="/academics" routerLinkActive="active">Academics</a></li>
            <li><a routerLink="/admissions" routerLinkActive="active">Admissions</a></li>
            <li><a routerLink="/faculty" routerLinkActive="active">Faculty</a></li>
            <li><a routerLink="/students" routerLinkActive="active">Students</a></li>
            <li><a routerLink="/gallery" routerLinkActive="active">Gallery</a></li>
            <li><a routerLink="/news" routerLinkActive="active">News</a></li>
            <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
          </ul>
        </nav>
        <div class="nav-actions">
          <ng-container *ngIf="currentUser$ | async as currentUser; else guestActions">
            <div class="user-summary">
              <span class="user-name">Hello, {{ currentUser.name }}</span>
              <span class="portal-label">{{ currentUser.role === 'admin' ? 'Admin Portal' : currentUser.role === 'faculty' ? 'Faculty Portal' : currentUser.role === 'student' ? 'Student Portal' : currentUser.role === 'parent' ? 'Parent Portal' : 'Portal' }}</span>
            </div>
            <button class="btn-portal" [routerLink]="currentUser.role === 'student' ? '/students' : currentUser.role === 'faculty' ? '/faculty' : currentUser.role === 'admin' ? '/admin' : '/home'">My Portal</button>
            <button class="btn-logout" (click)="logout()">Logout</button>
          </ng-container>
          <ng-template #guestActions>
            <button class="btn-login" routerLink="/login">Login</button>
            <button class="btn-register" routerLink="/register">Register</button>
          </ng-template>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['../header.scss']
})
export class HeaderComponent {
  currentUser$ = this.apiService.currentUser$;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  logout(): void {
    this.apiService.logout();
    this.router.navigate(['/home']);
  }
}
