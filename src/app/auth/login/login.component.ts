import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showError: boolean = false;
  userForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  // Login
  onLogin(): void {
    this.showError = false;
    this.authService.login(this.userForm.get('email').value, this.userForm.get('password').value).subscribe((user) => {
      //console.log(user);
    }, (error) => {
      this.showError = true;
    });
  }

}
