import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import EnrollmentRate from './enrollment-rate.model';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentRateService {

  ENROLLMENT_RATE_URL = 'http://localhost:4200/api/enrollments_rates/';

  constructor(private httpClient: HttpClient) { }

  // Get enrollments and rates
  getEnrollmentsRates(): Observable<EnrollmentRate[]> {
    return this.httpClient.get<EnrollmentRate[]>(this.ENROLLMENT_RATE_URL);
  }

  // Enroll user in course
  enrollUserInCourse(userId: number, courseId: number): Observable<EnrollmentRate> {
    let er: EnrollmentRate = new EnrollmentRate();
    er.userId = userId;
    er.courseId = courseId;
    er.rating = null;
    return this.httpClient.post<EnrollmentRate>(this.ENROLLMENT_RATE_URL, er);
  }

  // Rate course
  rateCourse(id: number, enrollmentRate: EnrollmentRate): Observable<EnrollmentRate> {
    return this.httpClient.put<EnrollmentRate>(this.ENROLLMENT_RATE_URL + id, enrollmentRate);
  }

}
