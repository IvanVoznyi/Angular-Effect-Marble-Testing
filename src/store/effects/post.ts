import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { PostAction } from '../actions/post';

@Injectable()
export class PostEffects {
  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostAction.loadPosts),
      switchMap(() =>
        this.postService.getPosts().pipe(
          map((posts) => PostAction.loadPostsSuccess({ posts })),
          catchError((error: Error) => {
            return of(PostAction.loadPostsFailure({ error }))
          })
        )
      ),
    )
  );

  constructor(private actions$: Actions, private postService: PostService) {}
}
