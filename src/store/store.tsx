import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './../reducers/rootReducer';
import thunk from 'redux-thunk';

const composeEnhancers =
(process.env.NODE_ENV === 'development' &&
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch