import { Component, OnInit } from '@angular/core';
import { UserService } from '../-user.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: any = new Array();
  color: String = new String();
  white: String = new String();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      (data: any) => {
        this.news = data.articles;
        this.color = '#dee2e6';
        this.white = 'white'
      }
    );
  }

}
