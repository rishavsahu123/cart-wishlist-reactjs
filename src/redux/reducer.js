const initialState = {
  productData: [],
  cartData: [],
  cartTotal: 0
};

/**
 * action handlers
 */
const actionHandlers = {
  FETCHING_PRODUCT: (state, {data}) => {
    const nextState = Object.assign({}, state, {
      productData: data
    });
    return nextState;
  },
  RECEIVING_CART: (state, {data, total}) => {
    const nextState = Object.assign({}, state, {
      cartData: data,
      cartTotal: total
    });
    return nextState;
  }
};

export default function reducer(state = initialState, action) {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
}
