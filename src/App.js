import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'
import PrivateRoute from './Components/authPages/PrivateRoute'
import Login from './Components/authPages/Login'
import SignUp from './Components/authPages/SignUp'
import DashBoard from './Components/Dashboard/DashBoard'
import ForgotPassword from './Components/authPages/ForgotPassword'
function App() {
  return (
    <Router>
          <AuthProvider>

            <Switch>
             <PrivateRoute path='/' exact component={DashBoard}/>
              <Route path='/signup' component={SignUp}/>
              <Route path='/login' component={Login}/>
              <Route path='/forgot-password' component={ForgotPassword}/>
            </Switch>
          </AuthProvider>
        </Router>
  );
}

export default App;
