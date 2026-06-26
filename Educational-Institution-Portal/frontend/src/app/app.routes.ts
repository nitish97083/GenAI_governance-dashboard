import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'academics', loadComponent: () => import('./pages/academics/academics.component').then(m => m.AcademicsComponent) },
  { path: 'admissions', loadComponent: () => import('./pages/admissions/admissions.component').then(m => m.AdmissionsComponent) },
  { path: 'faculty', loadComponent: () => import('./pages/faculty/faculty.component').then(m => m.FacultyComponent) },
  { path: 'students', loadComponent: () => import('./pages/students/students.component').then(m => m.StudentsComponent) },
  { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent) },
  { path: 'news', loadComponent: () => import('./pages/news/news.component').then(m => m.NewsComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'admin', loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent) },
];
