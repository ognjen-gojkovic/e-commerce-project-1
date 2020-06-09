## redux-saga

- `all()` allows us to run each individual saga parallel with each other, all of them at onec without waiting for last saga to finish

```javascript
const { Provider, connect } = ReactRedux;
const { createStore, applyMiddleware } = Redux;
const createSagaMiddleware = ReduxSaga.default;
const { takeEvery } = ReduxSaga;
const { put, call } = ReduxSaga.effects;

// Reducer
const initialState = {
  url: "",
  loading: false,
  error: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUESTED_DOG":
      return {
        url: "",
        loading: true,
        error: false,
      };
    case "REQUESTED_DOG_SUCCEEDED":
      return {
        url: action.url,
        loading: false,
        error: false,
      };
    case "REQUESTED_DOG_FAILED":
      return {
        url: "",
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

// Action Creators
const requestDog = () => {
  return { type: "REQUESTED_DOG" };
};

const requestDogSuccess = (data) => {
  return { type: "REQUESTED_DOG_SUCCEEDED", url: data.message };
};

const requestDogError = () => {
  return { type: "REQUESTED_DOG_FAILED" };
};

const fetchDog = () => {
  return { type: "FETCHED_DOG" };
};

// Sagas
function* watchFetchDog() {
  yield takeEvery("FETCHED_DOG", fetchDogAsync);
}

function* fetchDogAsync() {
  try {
    yield put(requestDog());
    const data = yield call(() => {
      return fetch("https://dog.ceo/api/breeds/image/random").then((res) =>
        res.json()
      );
    });
    yield put(requestDogSuccess(data));
  } catch (error) {
    yield put(requestDogError());
  }
}

// Component
class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.dispatch(fetchDog())}>
          Show Dog
        </button>
        {this.props.loading ? (
          <p>Loading...</p>
        ) : this.props.error ? (
          <p>Error, try again</p>
        ) : (
          <p>
            <img src={this.props.url} />
          </p>
        )}
      </div>
    );
  }
}

// Store
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchFetchDog);

const ConnectedApp = connect((state) => {
  console.log(state);
  return state;
})(App);

// Container component
ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("root")
);
```

### redux-saga counter

```javascript
import { put, delay, takeEvery, all } from "redux-saga/effects";
import { actionTypes } from "../counter/actionTypes";

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: actionTypes.INCREMENT });
}

function* watchIncrementAsync() {
  yield takeEvery(actionTypes.INCREMENT_ASYNC, incrementAsync);
}

export function* rootSaga() {
  yield all([watchIncrementAsync()]);
}
```

### redux-saga json-placeholder

```javascript

====================================================
./postActions

import {actionTypes} from '../posts/actionTypes';

const requestPostsStart = () => ({
    type: actionTypes.REQUEST_POSTS_START
})

const requestPostsSuccess = (data) => ({
    type: actionTypes.REQUEST_POSTS_SUCCESS
    payload: data
})

const requestPostsError = (err) => ({
    type: actionTypes.REQUEST_POSTS_ERROR,
    payload: err
})

// this actions will be called on button click event
const fetchPosts = () => ({
    type: actionTypes.FETCH_POSTS
})

====================================================

import {put, call, all, takeEvery} from 'redux-saga/effects';

import {actionTypes} from '../posts/actionTypes';
import {postActions} from '../post/actions';

function* watchFetchPostAsync() {
    yield takeEvery(actionTypes.FETCH_POSTS, fetchPostsAsync)
}


function* fetchPostsAsync() {
    try {
        yield put(requestPostStart());
        const data = yield call(() => {
            fetch('https://jsonplaceholder.typicode.com/posts').then(request => request.json())
        })
        yield put(requestPostSuccess(data))
    }catch(err) {
        yield put(requestPostsError())
    }
}

export function* rootSaga() {
    yield all([watchFetchPostsAsync()])
}


```

### redux-saga fetch-posts

```javascript
========================================================
/actionTypes.js

export const actionTypes = {
  REQUEST_POSTS_START: 'REQUEST_POSTS_START',
  REQUEST_POSTS_SUCCESS: 'REQUEST_POSTS_SUCCESS',
  REQUEST_POSTS_FAILURE: 'REQUEST_POSTS_FAILURE',
  FETCH_POSTS: 'FETCH_POSTS'
}

========================================================
/actions.js

import { actionTypes } from './posts/actionTypes';

export const requestPostsStart = () => ({
  type: actionTypes.REQUEST_POSTS_START
})

export const requestPostsSuccess = (posts) => ({
  type: actionTypes.REQUEST_POSTS_SUCCESS,
  payload: posts
})

export const requestPostsFailure = (err) => ({
  type:actionTypes.REQUEST_POSTS_FAILURE,
  payload: err
})

export const fetchPosts = () => ({
  type: actionTypes.FETCH_POSTS
})


==========================================================
/sagas.js

import { put, call, takeEvery } from 'redux-saga';
import {  } from './posts/actions';
import { actionTypes } from './posts/actionsTypes';

function* watchFetchPostsAsync() {
  yield takeEvery(actionTypes.FETCH_POSTS, fetchPostAsync)
}

function* fetchPostsAsync() {
  try {
  yield put(requestPostsStart());
  const data = yield call(() => {
    fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
  });
  yield put(requestPostsSuccess(data));
  } catch(err) {
    yield put(requstPostsFailure(err))
  }
}

export function* rootSaga() {
  yield all([watchFetchPostsAsync()])
}

===========================================================
/store.js

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './posts/sagas'

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware]

export const store = createStore(postsReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga);

==========================================================
/index.js

import { Provider } from 'react-redux';
import { store } from './posts/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>, document.getElementById('root');
)

==========================================================
/App.js

import React from 'react';
import { connect, dispatch } from 'react-redux';

const App = ({post, fetchPosts}) => {

  return (
    <div className='wrapper'>
      <span className='post'>{post}</span>
      <button onClick={() => fetchPosts()</button>fetchPosts}>Fetch Posts</button>
    </div>
  )
}

const mapStateToProps = state => {
  posts: (state) => state.posts
}

const mapDispatchToProps = dispatch => {
  fetchPosts: () => dispatch(fetchPosts())
}

```
