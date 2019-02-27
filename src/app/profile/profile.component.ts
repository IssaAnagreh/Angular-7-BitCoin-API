import { Component } from '@angular/core';
import { UserService } from '../-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  user: any = new Object();
  showEdit: any = 'none';
  private edit: any = {
    name: '',
    info: '',
    password: '',
  };

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    if (!localStorage.getItem('currentUser')) {
      return this.router.navigate(['login']);
    }
    this.userService.checkSession(localStorage.getItem('currentUser')).subscribe(
      (res: any): void => {
        if (res.message === 'Not Authorized' && res.message !== 'OK') {
          localStorage.removeItem('currentUser')
          this.router.navigate(['login']);
        }
      })
    this.userService.getByToken(localStorage.getItem('currentUser')).subscribe(
      (res: any): void => {
        this.user = res;
      })
  }

  logout(): void {
    this.userService.logout().subscribe(
      (user: any): void => {
        localStorage.removeItem('currentUser')
      })
  }

  onClickEdit(): void {
    if (this.showEdit === 'none') {
      this.showEdit = 'block';
    } else {
      this.showEdit = 'none';
    }

  }

  handleNameInput(event: any): void {
    this.edit.name = event.target.value;
  }

  handleInfoInput(event: any): void {
    this.edit.info = event.target.value;
  }

  handlePasswordInput(event: any): void {
    this.edit.password = event.target.value;
  }

  onClickSubmitEdit(): void {
    this.userService.updateUser(this.edit).subscribe(
      (res: any) => {
        if (res.message === "User is edited successfully!") {
          return this.router.navigate(['login']);
        }
      }
    )
  }

  onClickRemoveAccount(): void {
    var confirmation;
    if (confirm("Press a button!")) {
      confirmation = true;
    } else {
      confirmation = false;
    }
    if (confirmation) {
      localStorage.removeItem('currentUser');
      this.userService.deleteUser().subscribe(
        (res: any) => {
          if (res.message === "Account is removed") {
            return this.router.navigate(['login']);
          }
        }
      )
    }
  };
}
