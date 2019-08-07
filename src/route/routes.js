import { ProductPage, CheckoutPage, OrderPlacedPage } from '../component'

export const routeConstants = {
  PRODUCT: '/product',
  CHECKOUT: '/checkout',
  ORDERPLACED: '/order-placed'
}

export const productRoute = [
  {
    path:routeConstants.PRODUCT,
    component: ProductPage
  },
  {
    path:routeConstants.CHECKOUT,
    component: CheckoutPage
  },
  {
    path:routeConstants.ORDERPLACED,
    component: OrderPlacedPage
  }
]