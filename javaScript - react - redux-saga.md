## redux-saga

- `npm i redux-saga`

### /reduxStore.js

```javascript
import createReduxSaga from "redux-saga";
import { fetchPostsStart } from "./reduxSaga";

const sagaMiddleware = createReduxSaga();

const middlewares = [sagaMiddleware];

const store = createStore(PersistedReducer, applyMiddleware(...middlewares));

sagaMiddleware.run();
```

### /reduxSaga.js

```javascript
import { takeEvery } from "redux-saga/effects";
import { ActionTypes } from "./actionTypes";

export function* fetchCollectionsAsync() {
  yield console.log("i am called");
}

export function* fetchCollectionsStart() {
  yield takeEvery(ActionTypes.FETCH_POSTS_START, fetchCollectionsAsync);
}
```
