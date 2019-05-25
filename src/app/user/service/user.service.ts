import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import UserInterface from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  USERS_URL: string = 'http://localhost:4200/api/users/';

  constructor(private httpClient: HttpClient) { }

  // Get user(s)
  getUsers(): Observable<UserInterface[]> {
    return this.httpClient.get<UserInterface[]>(this.USERS_URL);
  }
  getUser(id: number): Observable<UserInterface> {
    return this.httpClient.get<UserInterface>(this.USERS_URL + id);
  }

  // Create or update user
  postUser(user: UserInterface): Observable<any> {
    if(user.id) {
      return this.httpClient.put(this.USERS_URL + user.id, user);
    } else {
      return this.httpClient.post(this.USERS_URL, user);
    }
  }

  // Delete user
  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(this.USERS_URL + id);
  }

}
