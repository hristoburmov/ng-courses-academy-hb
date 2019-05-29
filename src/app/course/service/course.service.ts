import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Course from '../model/course.model';
import { map, switchMap } from 'rxjs/operators';
import { EnrollmentRateService } from 'src/app/misc/enrollment-rate.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  COURSES_URL: string = 'http://localhost:4200/api/courses/';
  
  constructor(private enrollmentRateService: EnrollmentRateService, private httpClient: HttpClient) { }

  // Get course(s)
  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.COURSES_URL);
  }
  getCourse(id: number): Observable<Course> {
    return this.httpClient.get<Course>(this.COURSES_URL + id).pipe(
      map((course: Course) => {

        return course;
      })
    );
  }

  // Create or update course
  postCourse(course: Course): Observable<any> {
    if(course.id) {
      return this.httpClient.put(this.COURSES_URL + course.id, course);
    } else {
      return this.httpClient.post(this.COURSES_URL, course);
    }
  }

  // Delete course
  deleteCourse(id: number): Observable<any> {
    return this.httpClient.delete(this.COURSES_URL + id);
  }
  
}
