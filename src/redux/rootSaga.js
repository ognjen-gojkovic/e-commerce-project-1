import { call, all } from "redux-saga/effects";
import { shopSagas } from "./shop/shopSaga";
import { userSagas } from "./user/userSaga";
import { cartSagas } from "./cart/cartSaga";

export function* rootSaga() {
  yield all([
    call(shopSagas) /*same as shopSagas()*/,
    call(userSagas),
    call(cartSagas),
  ]);
}
