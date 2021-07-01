import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import SignUp from './components/SignUp';
import Feed from './components/Feed';
import AuthProvider, { AuthContext } from './context/AuthProvider';
import Login from './components/Login';
import Profile from './components/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {console.log('Inside AuthProvider')}
        <Switch>
          {console.log('Inside Switch')}
          <Route path='/login' component={Login}></Route>
          <Route path='/signup' component={SignUp}></Route>
          <PrivateRoute path='/profile' comp={Profile}></PrivateRoute>
          <PrivateRoute path='/' exact comp={Feed}></PrivateRoute>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

function PrivateRoute(parentProps) {
  let { currentUser } = useContext(AuthContext);
  console.log('Inside privateRoute', currentUser);
  const Component = parentProps.comp;
  return (
    <Route
      {...parentProps}
      render={() => {
        {
          console.log('Inside render');
        }
        return currentUser != null ? (
          <Component></Component>
        ) : (
          <Redirect to='/login'></Redirect>
        );
      }}
    ></Route>
  );
}
