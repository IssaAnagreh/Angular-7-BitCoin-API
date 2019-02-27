import { Component, OnInit } from '@angular/core';
import { UserService } from '../-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: any = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['profile']);
    }
  }

  handleEmailInput(event: any): void {
    this.user.email = event.target.value;
  }

  handlePasswordInput(event: any): void {
    this.user.password = event.target.value;
  }

  OnClickLogin() {
    this.userService.login(this.user).toPromise().then(
      (user: any): void => {
        localStorage.setItem('currentUser', user.token);
      }).then(res => {
        this.router.navigate(['profile'])});
  }
}


