import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { 
  User, Faculty, Student, Course, Department, Admission, 
  News, Gallery, ContactMessage, AuthResponse, ApiResponse 
} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  // Auth Methods
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password });
  }

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, user);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private loadCurrentUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get<User>(`${this.apiUrl}/auth/me`).subscribe(
        user => this.currentUserSubject.next(user),
        () => localStorage.removeItem('token')
      );
    }
  }

  // Faculty Methods
  getFaculty(): Observable<ApiResponse<Faculty[]>> {
    return this.http.get<ApiResponse<Faculty[]>>(`${this.apiUrl}/faculty`);
  }

  getFacultyById(id: number): Observable<ApiResponse<Faculty>> {
    return this.http.get<ApiResponse<Faculty>>(`${this.apiUrl}/faculty/${id}`);
  }

  createFaculty(faculty: Faculty): Observable<ApiResponse<Faculty>> {
    return this.http.post<ApiResponse<Faculty>>(`${this.apiUrl}/faculty`, faculty);
  }

  updateFaculty(id: number, faculty: Faculty): Observable<ApiResponse<Faculty>> {
    return this.http.put<ApiResponse<Faculty>>(`${this.apiUrl}/faculty/${id}`, faculty);
  }

  deleteFaculty(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/faculty/${id}`);
  }

  // Student Methods
  getStudents(): Observable<ApiResponse<Student[]>> {
    return this.http.get<ApiResponse<Student[]>>(`${this.apiUrl}/students`);
  }

  getStudentById(id: number): Observable<ApiResponse<Student>> {
    return this.http.get<ApiResponse<Student>>(`${this.apiUrl}/students/${id}`);
  }

  createStudent(student: Student): Observable<ApiResponse<Student>> {
    return this.http.post<ApiResponse<Student>>(`${this.apiUrl}/students`, student);
  }

  updateStudent(id: number, student: Student): Observable<ApiResponse<Student>> {
    return this.http.put<ApiResponse<Student>>(`${this.apiUrl}/students/${id}`, student);
  }

  deleteStudent(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/students/${id}`);
  }

  // Course Methods
  getCourses(): Observable<ApiResponse<Course[]>> {
    return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/courses`);
  }

  getCourseById(id: number): Observable<ApiResponse<Course>> {
    return this.http.get<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`);
  }

  createCourse(course: Course): Observable<ApiResponse<Course>> {
    return this.http.post<ApiResponse<Course>>(`${this.apiUrl}/courses`, course);
  }

  updateCourse(id: number, course: Course): Observable<ApiResponse<Course>> {
    return this.http.put<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`, course);
  }

  deleteCourse(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/courses/${id}`);
  }

  // Department Methods
  getDepartments(): Observable<ApiResponse<Department[]>> {
    return this.http.get<ApiResponse<Department[]>>(`${this.apiUrl}/departments`);
  }

  getDepartmentById(id: number): Observable<ApiResponse<Department>> {
    return this.http.get<ApiResponse<Department>>(`${this.apiUrl}/departments/${id}`);
  }

  createDepartment(department: Department): Observable<ApiResponse<Department>> {
    return this.http.post<ApiResponse<Department>>(`${this.apiUrl}/departments`, department);
  }

  updateDepartment(id: number, department: Department): Observable<ApiResponse<Department>> {
    return this.http.put<ApiResponse<Department>>(`${this.apiUrl}/departments/${id}`, department);
  }

  deleteDepartment(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/departments/${id}`);
  }

  // Admission Methods
  getAdmissions(): Observable<ApiResponse<Admission[]>> {
    return this.http.get<ApiResponse<Admission[]>>(`${this.apiUrl}/admissions`);
  }

  getAdmissionById(id: number): Observable<ApiResponse<Admission>> {
    return this.http.get<ApiResponse<Admission>>(`${this.apiUrl}/admissions/${id}`);
  }

  createAdmission(admission: Admission): Observable<ApiResponse<Admission>> {
    return this.http.post<ApiResponse<Admission>>(`${this.apiUrl}/admissions`, admission);
  }

  updateAdmission(id: number, admission: Admission): Observable<ApiResponse<Admission>> {
    return this.http.put<ApiResponse<Admission>>(`${this.apiUrl}/admissions/${id}`, admission);
  }

  deleteAdmission(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/admissions/${id}`);
  }

  // News Methods
  getNews(): Observable<ApiResponse<News[]>> {
    return this.http.get<ApiResponse<News[]>>(`${this.apiUrl}/news`);
  }

  getNewsById(id: number): Observable<ApiResponse<News>> {
    return this.http.get<ApiResponse<News>>(`${this.apiUrl}/news/${id}`);
  }

  createNews(news: News): Observable<ApiResponse<News>> {
    return this.http.post<ApiResponse<News>>(`${this.apiUrl}/news`, news);
  }

  updateNews(id: number, news: News): Observable<ApiResponse<News>> {
    return this.http.put<ApiResponse<News>>(`${this.apiUrl}/news/${id}`, news);
  }

  deleteNews(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/news/${id}`);
  }

  // Gallery Methods
  getGallery(): Observable<ApiResponse<Gallery[]>> {
    return this.http.get<ApiResponse<Gallery[]>>(`${this.apiUrl}/gallery`);
  }

  getGalleryById(id: number): Observable<ApiResponse<Gallery>> {
    return this.http.get<ApiResponse<Gallery>>(`${this.apiUrl}/gallery/${id}`);
  }

  createGallery(gallery: Gallery): Observable<ApiResponse<Gallery>> {
    return this.http.post<ApiResponse<Gallery>>(`${this.apiUrl}/gallery`, gallery);
  }

  updateGallery(id: number, gallery: Gallery): Observable<ApiResponse<Gallery>> {
    return this.http.put<ApiResponse<Gallery>>(`${this.apiUrl}/gallery/${id}`, gallery);
  }

  deleteGallery(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/gallery/${id}`);
  }

  // Contact Message Methods
  sendContactMessage(message: ContactMessage): Observable<ApiResponse<ContactMessage>> {
    return this.http.post<ApiResponse<ContactMessage>>(`${this.apiUrl}/contact`, message);
  }

  getContactMessages(): Observable<ApiResponse<ContactMessage[]>> {
    return this.http.get<ApiResponse<ContactMessage[]>>(`${this.apiUrl}/contact`);
  }

  getContactMessageById(id: number): Observable<ApiResponse<ContactMessage>> {
    return this.http.get<ApiResponse<ContactMessage>>(`${this.apiUrl}/contact/${id}`);
  }

  deleteContactMessage(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/contact/${id}`);
  }
}
