import React from 'react'
import { Redirect } from 'react-router-dom'
import { productRoute } from './routes'

export const APPLICATION_INDEX_ROUTE = '/'
export const createRoutes = (store) => {
  const RedirectComponent = props => (<Redirect to='/product' />)
  let routes = [{ path:APPLICATION_INDEX_ROUTE, component:RedirectComponent }]
  routes = routes.concat(productRoute)
  return routes
}

export default createRoutes