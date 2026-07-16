import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Highlight } from '../../directives/highlight';
import { CreditLabel } from '../../pipes/credit-label-pipe';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, Highlight, CreditLabel],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {
  @Input() course!: { id: number; name: string; code: string; credits: number; gradeStatus?: string };

  isExpanded = false;

  constructor(
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course']) {
      console.log('Previous course:', changes['course'].previousValue);
      console.log('Current course:', changes['course'].currentValue);
    }
  }

  get isEnrolled(): boolean {
    return this.enrollmentService.isEnrolled(this.course.id);
  }

  onEnrollClick() {
    if (this.isEnrolled) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  viewDetails() {
    this.router.navigate(['courses', this.course.id]);
  }

  get statusBorderColor(): string {
    switch (this.course?.gradeStatus) {
      case 'passed': return 'green';
      case 'failed': return 'red';
      case 'pending': return 'grey';
      default: return '#ddd';
    }
  }

  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course?.credits >= 4,
      'expanded': this.isExpanded
    };
  }
}