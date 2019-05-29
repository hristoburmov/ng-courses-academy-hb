import { Component, OnInit } from '@angular/core';
import Course from '../../model/course.model';
import { CourseService } from '../../service/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import EnrollmentRate from 'src/app/misc/enrollment-rate.model';
import { EnrollmentRateService } from 'src/app/misc/enrollment-rate.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  constructor(private courseService: CourseService, private authService: AuthService, private enrollmentRateService: EnrollmentRateService, private router: Router, private activatedRoute: ActivatedRoute) { }

  userId: number = this.authService.getId();
  course: Course = new Course();
  userRating: number = null;
  rating: string = null;
  votes: number = 0;
  isEnrolled: boolean = false;
  isRatingDisabled = false;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if(params['id'] != 'add') {
        const id: number = Number(params['id']);
        if(Number.isNaN(id)) {
          this.router.navigateByUrl('/courses');
        } else {
          this.getCourse(id);
        }
      }
    });
  }

  // Utilities
  private getCourse(id: number): void {
    let course: Observable<Course> = this.courseService.getCourse(id);
    let enrollmentsRates: Observable<EnrollmentRate[]> = this.enrollmentRateService.getEnrollmentsRates();
    forkJoin([course, enrollmentsRates]).subscribe((data) => {
      let course: Course = data[0];
      let enrollmentsRates: EnrollmentRate[] = data[1];

      let votes: number = 0;
      let score: number = 0;
      enrollmentsRates.forEach((enrollment) => {
        if(enrollment.courseId === course.id && enrollment.userId === this.userId) {
          this.isEnrolled = true;
          this.userRating = enrollment.rating;
        }
        if(enrollment.courseId === course.id && enrollment.rating != null) {
          votes++;
          score += enrollment.rating;
        }
      });

      this.course = course;
      this.rating = (score / votes).toFixed(1);
      if(this.rating === 'NaN') {
        this.rating = '0.0';
      }
      this.votes = votes;
    });
  }

  // Enroll
  onEnroll(): void {
    this.enrollmentRateService.enrollUserInCourse(this.userId, this.course.id).subscribe((data) => {
      this.isEnrolled = true;
    });
  }

  // Rate
  onRatingChange(event): void {
    this.isRatingDisabled = true;
    this.enrollmentRateService.getEnrollmentsRates().subscribe((data) => {
      let enrollmentRate: EnrollmentRate = null;
      for(let e of data) {
        if(e.userId === this.userId && e.courseId === this.course.id) {
          enrollmentRate = e;
          break;
        }
      }
      enrollmentRate.rating = parseFloat(event.target.value);

      this.enrollmentRateService.rateCourse(enrollmentRate.id, enrollmentRate).subscribe((data) => {
        this.isRatingDisabled = false;
        this.getCourse(this.course.id);
      });
    });
  }

}
