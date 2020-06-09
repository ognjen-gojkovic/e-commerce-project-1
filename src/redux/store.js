import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import PersistedReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [logger, sagaMiddleware];

const store = createStore(PersistedReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export default { persistor, store };
