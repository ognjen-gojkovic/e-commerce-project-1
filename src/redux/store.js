import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
// import { rootReducer } from "./rootReducer";
import PersistedReducer from "./rootReducer";

const middleware = [logger];

const store = createStore(PersistedReducer, applyMiddleware(...middleware));

const persistor = persistStore(store);

export default { persistor, store };
