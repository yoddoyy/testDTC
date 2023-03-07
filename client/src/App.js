import React from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LoginPage from "./pages/LoginPage"
import ListProductPage from "./pages/ListProductPage"
import ListOrderPage from "./pages/ListOrderPage"
import AddOrderPage from "./pages/AddOrderPage"
import EditOrderPage from "./pages/EditOrderPage"
import ReportPage from "./pages/ReportPage"

 function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">  <LoginPage/>  </Route>
        <Route exact path="/order">  <ListOrderPage/>  </Route>
        <Route exact path="/product">  <ListProductPage/>  </Route>
        <Route exact path="/order/add">  <AddOrderPage/>  </Route>
        <Route exact path="/order/:id/edit">  <EditOrderPage/>  </Route>
        <Route exact path="/report">  <ReportPage/>  </Route>
      </Switch>
    </Router>
  )
}

export default App;