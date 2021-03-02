import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  user: any;
  userId: number;
  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.title.setTitle('SSR | Detail');

    this.meta.addTags([
      { name: 'twitter:card', content: 'Detail Page' },
      { name: 'twitter:site', content: 'Server side rendering: Detail page' },
    ]);

    this.meta.updateTag(
      { name: 'twitter:card', content: 'UPDATED: Detail Page' },
    );

    this.meta.updateTag(
      { name: 'twitter:site', content: 'UPDATED: Server side rendering: Detail page' },
    );


    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      if (params.user_id) {
        this.userId = params.user_id;
        this.apiCalling();
      } else {
        this.router.navigateByUrl('/');
      }
    });

  }

  apiCalling(): void {
    this.getUser().subscribe(
      res => {
        this.user = res;
      },
      err => {
        console.log('ERROR: ', err);
      }
    );
  }

  getUser(): Observable<any> {
    return this.httpClient.get<any>('https://jsonplaceholder.typicode.com/users/' + this.userId);
  }

}
