import React from 'react';
import gameRequests from '../../firebaseRequests/games';
import collectionRequests from '../../firebaseRequests/collection';
import auth from '../../firebaseRequests/auth';

import Game from '../Game/Game';

import './Search.css';

class Search extends React.Component {
  state = {
    games: [],
    collection: [],
  }

  addToCollection = (gameId) => {
    this.setState({collection: gameId});
    const gameToAdd = {
      gamesId: gameId,
      status: 'owned',
      uid: auth.getUid(),
    };
    collectionRequests
      .postRequest(gameToAdd)
  }

  // updateToInCollection = (userGameId) => {
  //   // const {userGame} = this.state;
  //   collectionRequests
  //     .putRequest( userGameId, tempGame )
  //     .then(() => {
  //       collectionRequests.getRequest();
  //     })
  //     .catch((er) => {
  //       console.error(er);
  //     });
  // }

  componentDidMount () {
    gameRequests
      .getRequest()
      .then((games) => {
        this.setState({games});
      })
      .catch((err) => {
        console.error('There was a problem requesting game info.', err);
      })
  }

  render () {
    const gameComponents = this.state.games.map((game) => {
      return (
        <Game
          key={game.id}
          details={game}
          addToCollection={this.addToCollection}
        />
      )
    })
    return (
      <div className="search-component container">
        <div className="Search">
          <h1>Search</h1>
          <div className="input-group row col-md-10 col-md-offset-1">
            <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
            <input type="text" className="form-control" placeholder="Browse through tens of games..." aria-describedby="sizing-addon2" />
          </div>
        </div>
        <div>
          <h1 className="More">More Games</h1>
          <ul className="games row">
            {gameComponents}
          </ul>
        </div>
      </div>
    );
  }
};

export default Search;
