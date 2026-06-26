/* Models/Interfaces for Educational Institution Portal */

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: 'student' | 'faculty' | 'admin' | 'parent';
  enrollmentNumber?: string;
  departmentId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Faculty {
  id?: number;
  name: string;
  email: string;
  phone: string;
  departmentId: number;
  specialization: string;
  qualification: string;
  experience: number;
  officeRoom: string;
  bio?: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Student {
  id?: number;
  userId: number;
  enrollmentNumber: string;
  departmentId: number;
  semesterNumber: number;
  gpa?: number;
  dateOfAdmission: Date;
  status: 'active' | 'inactive' | 'graduated';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Course {
  id?: number;
  courseName: string;
  courseCode: string;
  departmentId: number;
  facultyId: number;
  credits: number;
  description: string;
  semester: number;
  schedule?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Department {
  id?: number;
  departmentName: string;
  headName: string;
  description: string;
  totalFaculty: number;
  totalStudents: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Admission {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  qualifications: string;
  preferredDepartment: number;
  applicationDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  marks: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface News {
  id?: number;
  title: string;
  content: string;
  author: string;
  publishDate: Date;
  image?: string;
  category: string;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Gallery {
  id?: number;
  title: string;
  description: string;
  image: string;
  category: string;
  eventDate?: Date;
  uploadedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
