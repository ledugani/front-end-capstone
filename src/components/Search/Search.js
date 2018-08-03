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
    query: '',
  }

  // getInfo = (keyword) => {
  //   console.log(keyword)
  //   const allGames = this.state.games;
  //   const searchRes = allGames.filter((game) => {
  //     return game.title.indexOf(this.state.query) !== -1;
  //   });
  //   this.setState({results: searchRes})
  // }

  searchFx = () => {
    const keywords = this.search.value;
    this.setState({
      query: keywords
    })
    // if (event.key === 'Enter') {
    //   this.getInfo(keywords);
    // }
  }

  addToCollection = (gameId) => {
    this.setState({collection: gameId});
    const gameToAdd = {
      gamesId: gameId,
      status: 'owned',
      uid: auth.getUid(),
    };
    collectionRequests.postRequest(gameToAdd);
  }

  componentDidMount () {
    gameRequests
      .getRequest()
      .then((games) => {
        this.setState({games});
        collectionRequests
          .getRequest(auth.getUid())
          .then((collection) => {
            this.setState({collection});
          })
      })
      .catch((err) => {
        console.error('There was a problem requesting game info.', err);
      })
  }

  render () {
    // const gameComponents = filteredGames.map((game) => {
    //   userCollection.map((userGame) => {
    //     if (game.id === userGame.gamesId) {
    //       console.log(userGame);
    //     }
    //   });
    // }
    const games = this.state.games;
    const userCollection = this.state.collection;

    const fix = games.map((singleGame) => {
      return userCollection.map((userGame) => {
        if (singleGame.id === userGame.gamesId) {
          return userGame;
        }
        return userGame;
      })
    })

    let filteredGames = this.state.games.filter(
      (gameObj) => {
        return gameObj.title.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1;
      }
    );

    const gameComponents = filteredGames.map((game) => {
      return (
        <Game
          key={game.id}
          details={game}
          addToCollection={this.addToCollection}
          userCollection={fix}
        />
      )
    })

    return (
      <div className="search-component container">
        <div className="Search">
          <h1>Search</h1>
          <div className="input-group row col-md-10 col-md-offset-1">
            <span className="input-group-addon glyphicon glyphicon-search" id="sizing-addon2"></span>
            <input
              type="text"
              className="form-control"
              placeholder="Browse through tens of games..."
              aria-describedby="sizing-addon2"
              ref={input => this.search = input}
              onChange={this.searchFx}
              onKeyPress={this.searchFx}
            />
          </div>
          <div>
            <h1 className="More">Games</h1>
            <ul className="games row">
            {gameComponents}
          </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default Search;
