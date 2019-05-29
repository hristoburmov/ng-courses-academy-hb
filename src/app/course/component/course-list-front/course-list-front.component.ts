import { Component, OnInit } from '@angular/core';
import Course from '../../model/course.model';
import { CourseService } from '../../service/course.service';
import { AuthService } from 'src/app/auth/auth.service';
import { forkJoin } from 'rxjs';
import { EnrollmentRateService } from 'src/app/misc/enrollment-rate.service';
import EnrollmentRate from 'src/app/misc/enrollment-rate.model';

@Component({
  selector: 'app-course-list-front',
  templateUrl: './course-list-front.component.html',
  styleUrls: ['./course-list-front.component.css']
})
export class CourseListFrontComponent implements OnInit {

  courses: Course[] = [];

  constructor(private courseService: CourseService, private enrollmentRateService: EnrollmentRateService, private authService: AuthService) { }

  ngOnInit() {
    forkJoin([this.courseService.getCourses(), this.enrollmentRateService.getEnrollmentsRates()]).subscribe((data) => {
      this.courses = data[0];
      let enrollmentsRatings: EnrollmentRate[] = data[1];
      for(let course of this.courses) {
        let id: number = course.id;
        let votes: number = 0;
        let score: number = 0;
        enrollmentsRatings.forEach((enrollmentRate) => {
          if(enrollmentRate.courseId === id && enrollmentRate.rating != null) {
            votes++;
            score += enrollmentRate.rating;
          }
        });
        course.rating = (score / votes).toFixed(1);
        if(course.rating === 'NaN') {
          course.rating = '0.0';
        }
      }
    });
  }

  onDelete(id: number): void {
    const index: number = this.courses.findIndex((course) => course.id === id);
    if(index !== -1) {
      this.courses.splice(index, 1);
      this.courseService.deleteCourse(id).subscribe();
    }
  }

}
