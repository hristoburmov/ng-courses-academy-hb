import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/service/user.service';
import UserInterface from 'src/app/user/model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserInterface[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onDelete(id: number): void {
    const index: number = this.users.findIndex((user) => user.id === id);
    if(index !== -1) {
      this.users.splice(index, 1);
      this.userService.deleteUser(id).subscribe();
    }
  }

}
