import { configureStore } from '@reduxjs/toolkit'
//Reducers
import counterReducer from './action-creators/counterSlice';
import themeModeToggleReducer from './action-creators/themeModeToggleSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    themeModeToggle: themeModeToggleReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch