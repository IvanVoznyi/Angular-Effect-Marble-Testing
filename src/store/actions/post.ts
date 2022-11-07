import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Post } from '../reducer/posts';

export const PostAction = createActionGroup({
  source: 'Post',
  events: {
    'Load Posts': emptyProps(),
    'Load Posts Success': props<{ posts: Array<Post> }>(),
    'Load Posts Failure': props<{ error: Error }>(),
  },
});
