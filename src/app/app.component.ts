import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Store } from '@ngrx/store';
import { PostAction } from 'src/store/actions/post';
import { Post } from 'src/store/reducer/posts';
@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[HttpClient]
})
export class AppComponent implements OnInit {

  protected http = inject(HttpClient)
  protected store = inject(Store)

  ngOnInit(): void {
    this.store.dispatch(PostAction.loadPosts())
  }
}
