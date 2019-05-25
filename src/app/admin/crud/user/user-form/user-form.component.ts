import { Component, OnInit } from '@angular/core';
import UserInterface from 'src/app/user/model/user.model';
import { UserService } from 'src/app/user/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  roles:string[] = [ 'ADMIN', 'USER' ];
  model = new UserInterface();

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if(params['id'] != 'add') {
        const id = Number(params['id']);
        if(id != NaN) {
          this.userService.getUser(id).subscribe((user) => {
            this.model = user;
          });
        }
      }
    });
  }

  onSave(): void {
    this.userService.postUser(this.model).subscribe((data) => {
      this.router.navigateByUrl("/admin/users");
    });
  }

}
