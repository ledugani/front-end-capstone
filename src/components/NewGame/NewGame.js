import React from 'react';
// import Game from '../Game/Game';
// import Collection from '../Collection/Collection';
import Platforms from '../Platforms/Platforms';

import gameRequests from '../../firebaseRequests/games';
import platformRequests from '../../firebaseRequests/platforms';
// import userGameRequests from '../../firebaseRequests/collection';
import './NewGame.css';

class NewGame extends React.Component {
  state = {
    newGame: {
      title: '',
      // initial_release: '',
      // developer: '',
      platforms: '',
      description: '',
      poster_path: '',
    }
  }

  formFieldStringState = (name, e) => {
    const tempGame = {...this.state.newGame};
    tempGame[name] = e.target.value;
    this.setState({newGame: tempGame});
  };

  titleChange = (e) => {
    this.formFieldStringState('title', e);
  }

  descriptionChange = (e) => {
    this.formFieldStringState('description', e);
  };

  imageUrlChange = (e) => {
    this.formFieldStringState('poster_path', e);
  };

  formSubmitEvent = (e) => {
    const newGame = this.state.newGame;
    e.preventDefault();
    gameRequests.postRequest(newGame)
      .then(() => {
        gameRequests.getRequest()
          .then(() => {
            this.setState({
              newGame: {
                title: '',
                // initial_release: '',
                // developer: '',
                description: '',
                poster_path: '',
              }
            })
          });
      })
      .catch((err) => {
        console.error('There was a problem with posting the game -> ', err);
      })
  };

  toggleCheckbox = (label) => {
    console.log(label)
  }

  createCheckbox = (label) => {
    return (
      <Platforms
        label={label}
        handleCheckboxChange={this.toggleCheckbox}
        key={label}
      />
    );
  }

  createCheckboxes = () => {
    console.log(this.state.platforms);
    // this.state.platforms.map(this.createCheckbox)
  }

  componentDidMount () {
    gameRequests
      .getRequest()
      .then((games) => {
        this.setState({games});
      })
      .catch((err) => {
        console.error('There was a problem requesting game info.', err);
      })

    platformRequests
      .getRequest()
      .then((platforms) => {
        this.setState({platforms});
      })
      .catch((err) => {
        console.error('There was a problem requesting platforms', err)
      })
  }

  render () {
    const {newGame} = this.state;
    return (
      <div className="NewGame">
        <h1>New Game</h1>
        <div className="col-xs-8 panel panel-info col-xs-offset-2">
          <form className="panel-body" onSubmit={this.formSubmitEvent}>
            <div className="form-group">
              <label htmlFor="gameTitle">Game Title:</label>
              <input
                type="text"
                className="form-control"
                id="gameTitle"
                placeholder="Video Game: The Video Game"
                value={newGame.title}
                onChange={this.titleChange}
              />
            </div>
            <div className="form-group">
              {this.createCheckboxes()}
              {/* <label>Platform: </label>
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
              </label> */}
            </div>
            <div>
              <label htmlFor="description">Description: </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                value={newGame.description}
                onChange={this.descriptionChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageURL">Image URL:</label>
              <input
                type="text"
                className="form-control"
                id="imageURL"
                placeholder="https://www.google.com/"
                value={newGame.poster_path}
                onChange={this.imageUrlChange}
              />
            </div>
            {/* <div className="form-group form-inline">
              <label htmlFor="datetime">Release Date: </label>
              <input type="date" id="datetime" placeholder="MM/DD/YYYY"/>
            </div>
            <div>
              <label htmlFor="developer">Development Team: </label>
              <select id="developer">
                <option>Bethesda Game Studios</option>
                <option>BioWare</option>
                <option>Blizzard Entertainment</option>
                <option>Bungie</option>
                <option>EA</option>
                <option>Epic Games</option>
                <option>Game Freak</option>
                <option>Harmonix Music Systems</option>
                <option>Id Software</option>
                <option>Infinity Ward</option>
                <option>Insomniac Games</option>
                <option>Konami</option>
                <option>LucasArts</option>
                <option>Midway</option>
                <option>Namco</option>
                <option>Naughty Dog</option>
                <option>Neversoft</option>
                <option>Rockstar Games</option>
                <option>Square Enix</option>
                <option>Sony Interactive Entertainment</option>
                <option>Ubisoft</option>
              </select>
            </div> */}
            <button
              type="submit"
              className="btn btn-primary"
            >
              Add Game
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default NewGame;
