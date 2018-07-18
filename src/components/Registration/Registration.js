import React from 'react';
import { Link } from 'react-router-dom';
import authRequests from '../../firebaseRequests/auth';

import './Registration.css';

class Registration extends React.Component {
  state={
    user: {
      email: '',
      password: '',
    },
  };

  registerClickEvent = (e) => {
    const {user} = this.state;
    e.preventDefault();
    authRequests
      .registerUser(user)
      .then(() => {
        this.props.history.push('/mycollection');
      })
      .catch((err) => {
        console.error('Error with registration request', err);
      })
  };

  emailChange = (e) => {
    const tempUser = {...this.state.user};
    tempUser.email = e.target.value;
    this.setState({user: tempUser});
  };

  passwordChange = (e) => {
    const tempUser = {...this.state.user};
    tempUser.password = e.target.value;
    this.setState({user: tempUser});
  };

  render () {
    const { user } = this.state;
    return (
      <div className="Registration">
        <div>
          <h1>Create Your Account</h1>
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
                  placeholder="email@example.com"
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
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="password"
                  value={user.password}
                  onChange={this.passwordChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="text-center">
                <Link to="/login">Already have an account?</Link>
              </div>
            </div>
            <div className="form-group">
              <div>
                <button
                  type="submit"
                  className="btn btn-default"
                  onClick={this.registerClickEvent}
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default Registration;
