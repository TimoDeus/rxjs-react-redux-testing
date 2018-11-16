import React from 'react'
import { Route, Switch } from 'react-router'
import Home from './components/Home'

export const App = () => (
  <Switch>
    <Route path="/" exact={true} component={Home}/>
  </Switch>
)

export default App
