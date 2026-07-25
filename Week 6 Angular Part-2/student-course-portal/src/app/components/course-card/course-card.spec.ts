import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { CourseCard } from './course-card';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  let store: MockStore;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockCourse = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideMockStore({
          initialState: { enrollment: { enrolledCourseIds: [] } }
        }),
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectEnrolledIds, []);

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;

    // Set the required @Input BEFORE detectChanges, since the template
    // reads course.name / course.id immediately
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the course name in the h3', () => {
    const h3 = fixture.debugElement.query(By.css('h3'));
    expect(h3.nativeElement.textContent).toContain('Data Structures');
  });

  it('should dispatch enrollInCourse when the Enroll button is clicked (not yet enrolled)', () => {
    spyOn(store, 'dispatch');

    // First button in the template is the Enroll/Unenroll toggle
    const enrollButton = fixture.debugElement.queryAll(By.css('button'))[0];
    enrollButton.nativeElement.click();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(
      enrollInCourse({ courseId: mockCourse.id })
    );
  });

  it('should dispatch unenrollFromCourse when already enrolled', () => {
    store.overrideSelector(selectEnrolledIds, [mockCourse.id]);
    store.refreshState();
    fixture.detectChanges();
    spyOn(store, 'dispatch');

    const enrollButton = fixture.debugElement.queryAll(By.css('button'))[0];
    enrollButton.nativeElement.click();

    expect(store.dispatch).toHaveBeenCalledWith(
      unenrollFromCourse({ courseId: mockCourse.id })
    );
  });

  it('should log previous and current course on ngOnChanges', () => {
    spyOn(console, 'log');

    const newCourse = { ...mockCourse, id: 2, name: 'Algorithms' };
    component.ngOnChanges({
      course: {
        previousValue: mockCourse,
        currentValue: newCourse,
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(console.log).toHaveBeenCalledWith('Previous course:', mockCourse);
    expect(console.log).toHaveBeenCalledWith('Current course:', newCourse);
  });
});