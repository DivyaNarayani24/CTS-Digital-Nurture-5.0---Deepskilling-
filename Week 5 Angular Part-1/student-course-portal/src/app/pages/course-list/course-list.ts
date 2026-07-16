import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';
import { Notification } from '../../components/notification/notification';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, FormsModule, CourseCard, CourseSummaryWidget, Notification],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
  courses: Course[] = [];
  isLoading = true;
  searchTerm = '';

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courses = this.courseService.getCourses();
    this.isLoading = false;

    const search = this.route.snapshot.queryParamMap.get('search');
    if (search) {
      this.searchTerm = search;
    }
  }

  onSearch(): void {
    this.router.navigate(['courses'], {
      queryParams: { search: this.searchTerm || null }
    });
  }

  get filteredCourses(): Course[] {
    if (!this.searchTerm) return this.courses;
    return this.courses.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }
}