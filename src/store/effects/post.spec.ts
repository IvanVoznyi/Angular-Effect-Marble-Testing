import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { PostEffects } from './post';
import { TestScheduler } from 'rxjs/testing';
import { PostService } from 'src/app/services/post.service';
import { PostAction } from '../actions/post';
import { Post } from '../reducer/posts';

describe('PostEffect', () => {
  let actions$: Observable<Action>;
  let effects: PostEffects;
  let testScheduler: TestScheduler;
  let mockGetPosts = jasmine.createSpy('getPros');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostEffects,
        provideMockActions(() => actions$),
        provideMockStore({}),
        {
          provide: PostService,
          useValue: {
            getPosts: mockGetPosts,
          },
        },
      ],
    });

    effects = TestBed.inject<PostEffects>(PostEffects);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should load posts', () => {
    const posts: Array<Post> = [
      {
        userId: 1,
        id: 1,
        body: 'test',
        title: 'test',
      },
    ];

    testScheduler.run(({ cold, hot, expectObservable }) => {
      actions$ = hot('-a', { a: PostAction.loadPosts });

      mockGetPosts.and.returnValue(cold('--a|', { a: posts }));

      expectObservable(effects.loadPost$).toBe('---c', {
        c: PostAction.loadPostsSuccess({ posts }),
      });
    });
  });

  it('should load posts failure', () => {
    const error = new Error('test');

    testScheduler.run(({ cold, hot, expectObservable }) => {
      actions$ = hot('-a', { a: PostAction.loadPosts });

      mockGetPosts.and.returnValue(cold('--#|', {}, error));

      expectObservable(effects.loadPost$).toBe('---c', {
        c: PostAction.loadPostsFailure({ error }),
      });
    });
  });
});
