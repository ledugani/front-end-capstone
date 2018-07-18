import React, { Component } from 'react';

import './App.css';

import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import MyCollection from '../components/MyCollection/MyCollection';
import Navbar from '../components/Navbar/Navbar';
import NewGame from '../components/NewGame/NewGame';
import Registration from '../components/Registration/Registration';
import Search from '../components/Search/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
        <Login />
        <MyCollection />
        <Navbar />
        <NewGame />
        <Registration />
        <Search />
      </div>
    );
  }
}

export default App;
