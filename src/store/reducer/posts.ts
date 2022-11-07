import { Action, createReducer, on } from "@ngrx/store"
import { PostAction } from "../actions/post"

export interface Post {
    userId: number
    id: number
    title: string
    body: string
}

export interface AppState {
    posts: Array<Post>,
    error: Error | null
}

export const initialState: AppState  = {
    posts: [],
    error: null
}

const _postReducer = createReducer(
    initialState,
    on(PostAction.loadPostsSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts
        }
    }),
    on(PostAction.loadPostsFailure, (state, action) => {
        return {
            ...state,
            error: action.error
        }
    })
)

export function postReducer(state: AppState | undefined, action: Action) {
    return _postReducer(state, action)
}