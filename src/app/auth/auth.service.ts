import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import UserInterface from '../user/model/user.model';
import { UserService } from '../user/service/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService, private router: Router) { }

  // Get user utility
  private getUser(): UserInterface {
    return JSON.parse(sessionStorage.getItem('currentLoggedInUser'));
  }

  // Is Logged In
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('currentLoggedInUser');
  }

  // Login
  login(email: string, password: string): Observable<UserInterface> {
    return new Observable((observer) => {
      this.userService.getUsers().subscribe((users) => {
        const user: UserInterface = users.find(user => user.email === email && user.password === password && user.isBlocked === false);
        if(user) {
          sessionStorage.setItem('currentLoggedInUser', JSON.stringify(user));
          observer.next(user);
          observer.complete();
          this.router.navigateByUrl('/home');
        } else {
          observer.error("Wrong credentials or blocked user");
        }
      });
    });
  }

  // Logout
  logout(): void {
    sessionStorage.removeItem('currentLoggedInUser');
    this.router.navigateByUrl('/home');
  }

  // Is Admin
  isAdmin(): boolean {
    if(!this.isLoggedIn()) {
      return false;
    }
    return this.getUser().role === 'ADMIN';
  }

  // Getters
  getId(): number {
    return this.getUser().id;
  }
  getName(): string {
    return this.getUser().name;
  }

}
