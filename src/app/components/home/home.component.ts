import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  appTitle = 'Angular Universal';
  users: any = [];
  constructor(
    private httpClient: HttpClient,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.apiCalling();
    this.title.setTitle('SSR | Home');

    this.meta.addTags([
      { name: 'twitter:card', content: 'Home Page' },
      { name: 'twitter:site', content: 'Server side rendering: Home page' },
    ]);
  }

  apiCalling(): void {
    this.getUsers().subscribe(
      res => {
        this.users = res;
      },
      err => {
        console.log('ERROR: ', err);
      }
    );
  }

  getUsers(): Observable<any> {
    return this.httpClient.get<any>('https://jsonplaceholder.typicode.com/users');
  }

}
