import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/courses';

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Algorithms', code: 'CS102', credits: 3, gradeStatus: 'pending' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensures no unexpected/outstanding HTTP requests were made in any test
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses via GET and return them', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should filter out courses with 0 credits', () => {
    const coursesWithZero: Course[] = [
      ...mockCourses,
      { id: 3, name: 'Seminar', code: 'CS103', credits: 0, gradeStatus: 'pending' }
    ];

    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses.find(c => c.id === 3)).toBeUndefined();
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush(coursesWithZero);
  });

  it('should propagate a friendly error message on server failure', (done) => {
    service.getCourses().subscribe({
      next: () => fail('expected an error, not a success'),
      error: (err: Error) => {
        expect(err.message).toBe('Failed to load courses. Please try again.');
        done();
      }
    });

    // retry(2) means 3 total attempts before catchError fires
    for (let i = 0; i < 3; i++) {
      const req = httpMock.expectOne(apiUrl);
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    }
  });

  it('should fetch a single course by id', () => {
    const single = mockCourses[0];

    service.getCourseById(1).subscribe(course => {
      expect(course).toEqual(single);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(single);
  });
});