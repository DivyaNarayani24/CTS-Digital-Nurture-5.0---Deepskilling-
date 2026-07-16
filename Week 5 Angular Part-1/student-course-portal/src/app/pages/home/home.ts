import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course';
@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  coursesAvailable = 0;   // NEW

  constructor(private courseService: CourseService) {}   // NEW

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

  ngOnInit() {
    console.log('HomeComponent initialised — courses loaded');
    this.coursesAvailable = this.courseService.getCourses().length;   // NEW
  }

  ngOnDestroy() {
    console.log('HomeComponent destroyed');
  }
}