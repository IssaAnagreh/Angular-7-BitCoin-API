import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newsAPI } from '../environments/newsAPI';
@Injectable({ providedIn: 'root' })

export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let day = today.getDate();
    return this.http.get(`https://newsapi.org/v2/everything?q=bitcoin&from=${year}-${month}-${day}&sortBy=publishedAt&apiKey=${newsAPI.api}`)

  }

  getByToken(token: string) {
    return this.http.get(`/profile/${token}`);
  }

  login(user: any) {
    return this.http.post('/user/login', user);
  }

  checkSession(token: any) {
    return this.http.post(`/user/login/check`, { token: token });
  }

  logout() {
    return this.http.get('/user/logout');
  }

  signup(user: any) {
    return this.http.post('/user/signup', user);
  }

  updateUser(edit: any) {
    return this.http.put(`profile/edit/`, edit);
  }

  deleteUser() {
    return this.http.delete(`/user/delete`);
  }
}
