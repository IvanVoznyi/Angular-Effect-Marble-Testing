import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { Post } from 'src/store/reducer/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private store: Store) { }

  getPosts() {
    return this.http.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts')
  }

}
