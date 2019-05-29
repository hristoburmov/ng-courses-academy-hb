import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import UserInterface from '../user/model/user.model';
import Course from '../course/model/course.model';
import EnrollmentRate from '../misc/enrollment-rate.model';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  // Override
  createDb() {
    let users: UserInterface[] = [
      {
        id: 1,
        name: 'Hristo',
        email: 'hristo@burmov.eu',
        password: 'asdf12345',
        role: 'ADMIN',
        isBlocked: false
      },
      {
        id: 2,
        name: 'John Doe',
        email: 'johnboi@gmail.com',
        password: '12345678',
        role: 'USER',
        isBlocked: true
      },
      {
        id: 3,
        name: 'Jim',
        email: 'jimjohnson@abv.bg',
        password: 'asdfpass',
        role: 'USER',
        isBlocked: false
      },
      {
        id: 4,
        name: 'Jenny Penny',
        email: 'jenny.p@hotmail.com',
        password: 'hehepass',
        role: 'ADMIN',
        isBlocked: false
      },
      {
        id: 5,
        name: 'Jerry',
        email: 'jerry@tomandjerry.com',
        password: '0987654321',
        role: 'USER',
        isBlocked: true
      },
      {
        id: 6,
        name: 'Steve',
        email: 'steve@apple.com',
        password: 'APPLisTHEb3st',
        role: 'ADMIN',
        isBlocked: false
      }
    ];

    let courses: Course[] = [
      {
        id: 1,
        title: 'Introduction course',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        rating: null
      },
      {
        id: 2,
        title: 'Second course, brother',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        rating: null
      },
      {
        id: 3,
        title: 'Final course',
        description: 'For the most advanced of users.',
        rating: null
      },
      {
        id: 4,
        title: 'Ultimate Final Course',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        rating: null
      }
    ];

    let enrollments_rates: EnrollmentRate[] = [
      {
        id: 1,
        courseId: 1,
        userId: 1,
        rating: 4
      },
      {
        id: 2,
        courseId: 1,
        userId: 2,
        rating: 3
      },
      {
        id: 3,
        courseId: 2,
        userId: 1,
        rating: 5
      }
    ];

    return {users, courses, enrollments_rates};
  }
}
