import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './index.css';
import App from './App';

import Register from './components/auth/register';
import reportWebVitals from './reportWebVitals';
import Login from './components/auth/login';
import Logout from './components/logout'
import Main from './components/main';
import Client from './components/pages/client'
import Orders from './components/pages/orders'
import Employees from './components/pages/employees';
import Vehicule from './components/pages/vehicules';
import Mixture from './components/pages/mixtures';
import ClientEdit from './components/admin/edit/clientedit';


const routing = (
  <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path = "/main" component={Main} />
        <Route path = "/main/clients" component={Client}/>
        <Route path = "/main/orders" component={Orders}/>
        <Route path = "/main/employees" component={Employees}/>
        <Route path = "/main/vehicules" component={Vehicule}/>
        <Route path = "/main/mixtures" component={Mixture}/>
        <Route path = "/main/client/edit/:id"component={ClientEdit}/>
        <Route path="/App" component={App} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
      </Switch>
  </Router>
)
ReactDOM.render(routing,
  document.getElementById('root')
);

reportWebVitals();

