import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employee from './pages/Employee';
import EmployeeRegister from './pages/Employee/Register';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/funcionarios" exact component={Employee} />
                <Route path="/funcionarios/register" component={EmployeeRegister} />
            </Switch>
        </Router>
    )
}