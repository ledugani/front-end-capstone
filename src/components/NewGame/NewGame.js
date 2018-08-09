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
      platforms: {},
      description: '',
      poster_path: '',
    }
  }
  //Attempt #3
  // checkItem = (platforms, e) => {
  //   let itemChecked = {...this.state.newGame};
  //   itemChecked[platforms] = e.target.value;
  //   this.setState({newGame: itemChecked});
  // }

  // xboxOneChange = (e) => {
  //   this.checkItem('platforms', e)
  // }

  // ps4Change = (e) => {
  //   this.checkItem('platforms', e)
  // }

  //Attempt #4
  platformChange = (e) => {
    const tempGame = {...this.state.newGame};
    const platformUpdate = tempGame.platforms;
    if (e.target.checked) {
      platformUpdate.push(e.target.value);
    } else {
      let index = platformUpdate.indexOf(e.target.value);
      platformUpdate.splice(index, 1);
    }
    this.setState({newGame: platformUpdate})
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

  // toggleCheckbox = (label) => {
  //   console.log(label)
  // }

  // createCheckbox = (label) => {
  //   return (
  //     <Platforms
  //       label={label}
  //       handleCheckboxChange={this.toggleCheckbox}
  //       key={label}
  //     />
  //   );
  // }

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

    // const createCheckboxes = () => {
    //   console.log(this.state.platforms);
    //   this.state.platforms.map(this.createCheckbox)
    // }

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
              {/* {createCheckboxes()} */}
              <label>Platform: </label>
              <br/>
              <label htmlFor="platform" className="checkbox-inline">
                <input
                  type="checkbox"
                  id="xbox-one"
                  value="Xbox One"
                  onChange={ this.platformChange }
                />
                Xbox One
              </label>
              <label htmlFor="platform" className="checkbox-inline">
                <input
                  type="checkbox"
                  id="ps4"
                  value="PS4"
                  onChange= { this.platformChange }
                />
                PS4
              </label>
              <label htmlFor="platform" className="checkbox-inline">
                <input
                  type="checkbox"
                  id="nintendo-switch"
                  value="Nintendo Switch"
                  onChange={ this.platformChange }
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
            <div className="form-group form-inline">
              <label htmlFor="datetime">Release Date: </label>
              <input type="date" id="datetime" placeholder="MM/DD/YYYY"/>
            </div>
            <div>
              <label htmlFor="developer">Development Team: </label>
              <select id="developer" onChange={this.changeDev}>
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
