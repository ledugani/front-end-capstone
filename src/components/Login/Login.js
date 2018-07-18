import React from 'react';
import { Link } from 'react-router-dom';

import authRequests from '../../firebaseRequests/auth';

import './Login.css';

class Login extends React.Component {
  state={
    user: {
      email: 'tom@tom.com',
      password: 'password',
    },
  };

  loginClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .loginUser(user)
      .then(() => {
        this.props.history.push('/mycollection');
      })
      .catch(errror => {
        console.error('Error logging user in.', errror);
      });
  };

  emailChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  passwordChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };

  render () {
    const { user } = this.state;
    return (
      <div className="Login">
        <div id="login-form">
          <h1 className="text-center">Login</h1>
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="inputEmail" className="control-label">
                Email:
              </label>
              <div>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder=""
                  value={user.email}
                  onChange={this.emailChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="inputPassword" className="control-label">
                Password:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword"
                  placeholder=""
                  value={user.password}
                  onChange={this.passwordChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <Link to="/registration">Need to Register?</Link>
              </div>
            </div>
            <div className="form-group">
              <div>
                <button
                  type="submit"
                  className="btn btn-default"
                  onClick={this.loginClickEvent}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default Login;
