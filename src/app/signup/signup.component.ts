import { Component, OnInit } from '@angular/core';
import { UserService } from '../-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private user = {
    name: '',
    email: '',
    password: '',
    info: ''
  };

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  handleNameInput(event: any): void {
    this.user.name = event.target.value;
  }

  handleEmailInput(event: any): void {
    this.user.email = event.target.value;
  }

  handlePasswordInput(event: any): void {
    this.user.password = event.target.value;
  }

  handleInfoInput(event: any): void {
    this.user.info = event.target.value;
  }

  OnClickSignup() {
    this.userService.signup(this.user).toPromise().then(
      (res: any): void => {
        localStorage.setItem('currentUser', res.token);
      }).then(res => {
        this.router.navigate(['login'])
      });
  }
}
