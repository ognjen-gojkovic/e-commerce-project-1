import ShopData from "./ShopData";

const INIT_STATE = {
  collections: ShopData,
};

export const shopReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
