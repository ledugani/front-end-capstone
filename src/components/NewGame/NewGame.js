import React from 'react';
import gameRequests from '../../firebaseRequests/games';
import platformRequests from '../../firebaseRequests/platforms';
import './NewGame.css';

class NewGame extends React.Component {
  state = {
    newGame: {
      title: '',
      initial_release: '',
      developer: '',
      platforms: {
        xboxOne: false,
        ps4: false,
        switch: false,
        xbox360: false,
        ps3: false,
        wii: false,
        xbox: false,
        ps2: false,
        gamecube: false,
        dreamcast: false,
        playstation: false,
        n64: false,
        saturn: false,
        nes: false,
        snes: false,
        genesis: false,
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
    } else if (platform === 'xbox360') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          xbox360: e.target.checked,
        }
      }
    } else if (platform === 'ps3') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          ps3: e.target.checked,
        }
      }
    } else if (platform === 'wii') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          wii: e.target.checked,
        }
      }
    } else if (platform === 'xbox') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          xbox: e.target.checked,
        }
      }
    } else if (platform === 'ps2') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          ps2: e.target.checked,
        }
      }
    } else if (platform === 'gamecube') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          gamecube: e.target.checked,
        }
      }
    } else if (platform === 'dreamcast') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          dreamcast: e.target.checked,
        }
      }
    } else if (platform === 'playstation') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          playstation: e.target.checked,
        }
      }
    } else if (platform === 'n64') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          n64: e.target.checked,
        }
      }
    } else if (platform === 'saturn') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          saturn: e.target.checked,
        }
      }
    } else if (platform === 'nes') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          nes: e.target.checked,
        }
      }
    } else if (platform === 'snes') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          snes: e.target.checked,
        }
      }
    } else if (platform === 'genesis') {
      tempGame = {
        ...this.state.newGame,
        platforms: {
          ...this.state.newGame.platforms,
          genesis: e.target.checked,
        }
      }
    }

    if (platform === console) {
      this.setState({newGame: tempGame});
    }
  }

  dateChange = (e) => {
    const temporGame = {
      ...this.state.newGame,
      initial_release: e.target.value,
    }
    this.setState({newGame: temporGame})
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
                initial_release: '',
                developer: '',
                platforms: {
                  xboxOne: false,
                  ps4: false,
                  switch: false,
                  xbox360: false,
                  ps3: false,
                  wii: false,
                  xbox: false,
                  ps2: false,
                  gamecube: false,
                  dreamcast: false,
                  playstation: false,
                  n64: false,
                  saturn: false,
                  nes: false,
                  snes: false,
                  genesis: false,
                },
                description: '',
                poster_path: '',
              }
            })
          });
      })
      .then(() => {

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
                placeholder="game title"
                value={newGame.title}
                onChange={this.titleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="developer">Development Team: </label>
              <br/>
              <select id="developer" onChange={ (e) => this.devChange(e) }>
                <option value="--select one--">--select one--</option>
                <option value="2K Games">2K Games</option>
                <option value="Acclaim Entertainment">Acclaim Entertainment</option>
                <option value="Activision">Activision</option>
                <option value="Amazing Studio">Amazing Studio</option>
                <option value="Bethesda Game Studios">Bethesda Game Studios</option>
                <option value="BioWare">BioWare</option>
                <option value="Blizzard Entertainment">Blizzard Entertainment</option>
                <option value="Bungie">Bungie</option>
                <option value="Crystal Dynamics">Crystal Dynamics</option>
                <option value="Data Design Interactive">Data Design Interactive</option>
                <option value="Deibus Studios">Deibus Studios</option>
                <option value="Disney Interactive Studios">Disney Interactive Studios</option>
                <option value="EA">EA</option>
                <option value="Empire Interactive">Empire Interactive</option>
                <option value="Epic Games">Epic Games</option>
                <option value="Game Freak">Game Freak</option>
                <option value="Ganbarion">Ganbarion</option>
                <option value="GT Interactive Software">GT Interactive Software</option>
                <option value="HAL Laboratory, Inc.">HAL Laboratory</option>
                <option value="Harmonix Music Systems">Harmonix Music Systems</option>
                <option value="High Voltage Software">High Voltage Software</option>
                <option value="Id Software">Id Software</option>
                <option value="Idol Minds">Idol Minds</option>
                <option value="Infinity Ward">Infinity Ward</option>
                <option value="Infogrames">Infogrames</option>
                <option value="Insomniac Games">Insomniac Games</option>
                <option value="Konami">Konami</option>
                <option value="LucasArts">LucasArts</option>
                <option value="Mad Catz">Mad Catz</option>
                <option value="Midway">Midway</option>
                <option value="Namco">Namco</option>
                <option value="Naughty Dog">Naughty Dog</option>
                <option value="Neversoft">Neversoft</option>
                <option value="Nintendo">Nintendo</option>
                <option value="Rockstar Games">Rockstar Games</option>
                <option value="SEGA">SEGA</option>
                <option value="Sierra">Sierra</option>
                <option value="Silicon Knights">Silicon Knights</option>
                <option value="Square Enix">Square Enix</option>
                <option value="Squaresoft">Squaresoft</option>
                <option value="Sony Interactive Entertainment">Sony Interactive Entertainment</option>
                <option value="Take-Two Interactive">Take-Two Interactive</option>
                <option value="Treasure">Treasure</option>
                <option value="Ubisoft">Ubisoft</option>
                <option value="XSEED Games">XSEED Games</option>
              </select>
            </div>

            <div className="form-group">
              <label>Platform: </label>
              <br/>
              <ul className="platformOptions">
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="xbox-one"
                      value="xboxOne"
                      onChange={ (e) => this.platformChange(e, 'xboxOne') }
                    />
                    Xbox One
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="ps4"
                      value="ps4"
                      onChange= { (e) => this.platformChange(e, 'ps4') }
                    />
                    PlayStation 4
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="nintendo-switch"
                      value="switch"
                      onChange={ (e) => this.platformChange(e, 'switch') }
                    />
                    Nintendo Switch
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="xbox360"
                      value="xbox360"
                      onChange= { (e) => this.platformChange(e, 'xbox360') }
                    />
                    Xbox 360
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="ps3"
                      value="ps3"
                      onChange= { (e) => this.platformChange(e, 'ps3') }
                    />
                    PlayStation 3
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="wii"
                      value="wii"
                      onChange= { (e) => this.platformChange(e, 'wii') }
                    />
                    Nintendo Wii
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="xbox"
                      value="xbox"
                      onChange= { (e) => this.platformChange(e, 'xbox') }
                    />
                    Xbox
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="ps2"
                      value="ps2"
                      onChange= { (e) => this.platformChange(e, 'ps2') }
                    />
                    PlayStation 2
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="gamecube"
                      value="gamecube"
                      onChange= { (e) => this.platformChange(e, 'gamecube') }
                    />
                    Nintendo Gamecube
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="dreamcast"
                      value="dreamcast"
                      onChange= { (e) => this.platformChange(e, 'dreamcast') }
                    />
                    Sega Dreamcast
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="playstation"
                      value="playstation"
                      onChange= { (e) => this.platformChange(e, 'playstation') }
                    />
                    PlayStation
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="n64"
                      value="n64"
                      onChange= { (e) => this.platformChange(e, 'n64') }
                    />
                    Nintendo 64
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="saturn"
                      value="saturn"
                      onChange= { (e) => this.platformChange(e, 'saturn') }
                    />
                    Sega Saturn
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="nes"
                      value="nes"
                      onChange= { (e) => this.platformChange(e, 'nes') }
                    />
                    Nintendo Entertainment System
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="snes"
                      value="snes"
                      onChange= { (e) => this.platformChange(e, 'snes') }
                    />
                    SNES
                  </label>
                </li>
                <li>
                  <label htmlFor="platform" className="checkbox-inline">
                    <input
                      type="checkbox"
                      id="genesis"
                      value="genesis"
                      onChange= { (e) => this.platformChange(e, 'genesis') }
                    />
                    Sega Genesis
                  </label>
                </li>
              </ul>
            </div>

            <div className="form-group">
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
              <input
                type="date"
                id="datetime"
                placeholder="MM/DD/YYYY"
                onChange={ (e) => this.dateChange(e) }
              />
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
