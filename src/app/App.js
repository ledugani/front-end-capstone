import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';

import './App.css';

import Home from '../components/Home/Home';
import Navbar from '../components/Navbar/Navbar';
// import Login from '../components/Login/Login';
// import MyCollection from '../components/MyCollection/MyCollection';
// import NewGame from '../components/NewGame/NewGame';
// import Registration from '../components/Registration/Registration';
import Search from '../components/Search/Search';

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends Component {
  state={
    authed: false,
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <PrivateRoute
                    path="/search"
                    authed={this.state.authed}
                    component={Search}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
