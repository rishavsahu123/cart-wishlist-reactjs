import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends React.Component{
  render(){
    const { store, route } = this.props
    return(
      <div>
        <Provider store={store}>
          <Router>
            <Switch>
            {
                route.map((option, index)=>(
                  <Route exact key={index} path={option.path} component={option.component} />
                ))
            }
            </Switch>
          </Router>
        </Provider>
      </div>      
    )
  }
}

export default App