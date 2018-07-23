import React from 'react';
// import Game from '../Game/Game';
// import Collection from '../Collection/Collection';

import gameRequests from '../../firebaseRequests/games';
import './NewGame.css';

class NewGame extends React.Component {
  state = {
    games: [],
    collection: {},
  }

  addNewGame = () => {};

  componentDidMount () {
    gameRequests
      .getRequest()
      .then((games) => {
        this.setState({games});
      })
      .catch((err) => {
        console.error('There was a problem with the get game request -> ', err);
      })
  }

  render () {
    return (
      <div className="NewGame">
        <h1>New Game</h1>
        <div className="col-xs-8 panel panel-info col-xs-offset-2">
          <form className="panel-body">
            <div className="form-group">
              <label htmlFor="gameTitle">Game Title:</label>
              <input type="text" className="form-control" id="gameTitle" placeholder="Name of Video Game" />
            </div>
            <div className="form-group">
              <label>Platform: </label>
              <br/>
              <label htmlFor="platform" className="checkbox-inline">
                <input type="checkbox" id="xbox-one" value="option1"/>
                Xbox One
              </label>
              <label htmlFor="platform" className="checkbox-inline">
                <input type="checkbox" id="ps4" value="option2"/>
                PS4
              </label>
              <label htmlFor="platform" className="checkbox-inline">
                <input type="checkbox" id="nintendo-switch" value="option3"/>
                Nintendo Switch
              </label>
            </div>
            <div>
              <label htmlFor="description">Description: </label>
              <textarea className="form-control" id="description" rows="3"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="imageURL">Image URL:</label>
              <input type="text" className="form-control" id="imageURL" placeholder="https://www.google.com/" />
            </div>
            <div className="form-group form-inline">
              <label htmlFor="month">Month: </label>
              <select className="form-control" id="month">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
              <label htmlFor="day">Day: </label>
              <select className="form-control" id="day">
              <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
              <label htmlFor="year">Year: </label>
              <select className="form-control" id="year">
                <option>1999</option>
                <option>2000</option>
                <option>2001</option>
              </select>
            </div>
            <div>
              <label htmlFor="developer">Development Team: </label>
              <select id="developer">
                <option>Square Enix</option>
                <option>Epic Games</option>
                <option>Blizzard Entertainment</option>
                <option>Rockstar Games</option>
                <option>Sony Interactive Entertainment</option>
              </select>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.addNewGame}
            >
              Primary
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default NewGame;
