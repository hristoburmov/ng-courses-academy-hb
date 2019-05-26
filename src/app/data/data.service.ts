import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  // Override
  createDb() {
    
    let users = [
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

    return {users};

  }
}
