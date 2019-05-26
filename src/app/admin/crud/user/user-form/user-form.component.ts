import { Component, OnInit } from '@angular/core';
import UserInterface from 'src/app/user/model/user.model';
import { UserService } from 'src/app/user/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  roles:string[] = [ 'ADMIN', 'USER' ];
  userForm: FormGroup = this.onGetUser(new UserInterface());

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if(params['id'] != 'add') {
        const id: number = Number(params['id']);
        if(Number.isNaN(id)) {
          this.router.navigateByUrl('/admin/users');
        } else {
          this.userService.getUser(id).subscribe((user) => {
            this.onGetUser(user);
          });
        }
      }
    });
  }

  // Update user form, when user is retrieved from DB
  onGetUser(user: UserInterface): FormGroup {
    this.userForm = this.formBuilder.group({
      id: [user.id],
      name: [user.name, [Validators.required, Validators.minLength(3)]],
      email: [user.email, [Validators.required, Validators.email]],
      password: [user.password, [Validators.required, Validators.minLength(8)]],
      role: [user.role, Validators.required],
      isBlocked: [user.isBlocked]
    });
    return this.userForm;
  }

  // Save
  onSave(): void {
    this.userService.postUser(this.userForm.value).subscribe((data) => {
      this.router.navigateByUrl('/admin/users');
    });
  }

  // Getters
  get id() {
    return this.userForm.get('id');
  }
  get name() {
    return this.userForm.get('name');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  get role() {
    return this.userForm.get('role');
  }
  get isBlocked() {
    return this.userForm.get('isBlocked');
  }

}
