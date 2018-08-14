import React from 'react';
// import Game from '../Game/Game';
// import Collection from '../Collection/Collection';
// import Platforms from '../Platforms/Platforms';

import gameRequests from '../../firebaseRequests/games';
import platformRequests from '../../firebaseRequests/platforms';
// import userGameRequests from '../../firebaseRequests/collection';
import './NewGame.css';

class NewGame extends React.Component {
  state = {
    newGame: {
      title: '',
      // initial_release: '',
      developer: '',
      platforms: {
        xboxOne: false,
        ps4: false,
        switch: false,
      },
      description: '',
      poster_path: '',
    }
  }

  platformChange = (e, console) => {
    const platform = e.target.value;
    let tempGame;

    if (platform === 'ps4') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          ps4: e.target.checked,
        }
      }
    } else if (platform === 'xboxOne') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          xboxOne: e.target.checked,
        }
      }
    } else if (platform === 'switch') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          switch: e.target.checked,
        }
      }
    }

    if (platform === console) {
      this.setState({newGame: tempGame});
    }
  }

  devChange = (e) => {
    const tempoGame = {
      ...this.state.newGame,
      developer: e.target.value,
    }
    this.setState({newGame: tempoGame})
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
                developer: '',
                platforms: {
                  xboxOne: false,
                  ps4: false,
                  switch: false,
                },
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

  componentDidMount () {
    gameRequests
      .getRequest()
      .then((games) => {
        this.setState({games});
        platformRequests
          .getRequest()
          .then((platforms) => {
            this.setState({platforms});
          })
      })
      .catch((err) => {
        console.error('There was a problem requesting game info.', err);
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
              <label htmlFor="developer">Development Team: </label>
              <br/>
              <select id="developer" onChange={ (e) => this.devChange(e) }>
                <option value="Bethesda Game Studios">Bethesda Game Studios</option>
                <option value="BioWare">BioWare</option>
                <option value="Blizzard Entertainment">Blizzard Entertainment</option>
                <option value="Bungie">Bungie</option>
                <option value="EA">EA</option>
                <option value="Epic Games">Epic Games</option>
                <option value="Game Freak">Game Freak</option>
                <option value="Harmonix Music Systems">Harmonix Music Systems</option>
                <option value="Id Software">Id Software</option>
                <option value="Infinity Ward">Infinity Ward</option>
                <option value="Insomniac Games">Insomniac Games</option>
                <option value="Konami">Konami</option>
                <option value="LucasArts">LucasArts</option>
                <option value="Midway">Midway</option>
                <option value="Namco">Namco</option>
                <option value="Naughty Dog">Naughty Dog</option>
                <option value="Neversoft">Neversoft</option>
                <option value="Rockstar Games">Rockstar Games</option>
                <option value="Square Enix">Square Enix</option>
                <option value="Sony Interactive Entertainment">Sony Interactive Entertainment</option>
                <option value="Ubisoft">Ubisoft</option>
              </select>
            </div>
            <div className="form-group">
              <label>Platform: </label>
              <br/>
              <label htmlFor="platform" className="checkbox-inline">
                <input
                  type="checkbox"
                  id="xbox-one"
                  value="xboxOne"
                  onChange={ (e) => this.platformChange(e, 'xboxOne') }
                />
                Xbox One
              </label>
              <label htmlFor="platform" className="checkbox-inline">
                <input
                  type="checkbox"
                  id="ps4"
                  value="ps4"
                  onChange= { (e) => this.platformChange(e, 'ps4') }
                />
                PS4
              </label>
              <label htmlFor="platform" className="checkbox-inline">
                <input
                  type="checkbox"
                  id="nintendo-switch"
                  value="switch"
                  onChange={ (e) => this.platformChange(e, 'switch') }
                />
                Nintendo Switch
              </label>
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
