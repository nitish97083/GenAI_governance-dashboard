import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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
          <button class="btn-login" routerLink="/login">Login</button>
          <button class="btn-register" routerLink="/register">Register</button>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['../header.scss']
})
export class HeaderComponent {}
