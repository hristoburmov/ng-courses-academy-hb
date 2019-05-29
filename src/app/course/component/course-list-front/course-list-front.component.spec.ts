import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListFrontComponent } from './course-list-front.component';

describe('CourseListFrontComponent', () => {
  let component: CourseListFrontComponent;
  let fixture: ComponentFixture<CourseListFrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseListFrontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
