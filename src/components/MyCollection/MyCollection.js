import React from 'react';

import SingleGame from '../SingleGame/SingleGame';
import collectionRequests from '../../firebaseRequests/collection';
import gameRequests from '../../firebaseRequests/games';
import authRequest from '../../firebaseRequests/auth';
import './MyCollection.css';

class MyCollection extends React.Component {
  state = {
    collection: [],
    games: [],
  }

  removeGame = (userGameId) => {
    const myCollection = [...this.state.collection];
    const updatedCollection = myCollection.filter((game) => {
      return game.id !== userGameId;
    });
    this.setState({collection: updatedCollection});
  }

  componentDidMount () {
    collectionRequests
      .getRequest(authRequest.getUid())
      .then((collection) => {
        this.setState({collection});
        gameRequests
          .getRequest()
          .then((games) => {
            this.setState({games});
          })
      })
      .catch((errr) => {
        console.error('There was a problem with the user collection get request -> ', errr);
      })
  }

  render () {
    const {games} = this.state;

    let collectionComponents;

    if (this.state.collection.length === 0) {
      collectionComponents = 'No games yet!';
    } else if (this.state.collection.length > 0) {
      collectionComponents = this.state.collection.map((userCollection) => {
        const game = games.find(x => x.id === userCollection.gameId);
        if (game !== undefined) {
          return (
            <SingleGame
              game={game}
              userCollection={userCollection}
              removeGame={ (e) => this.removeGame(e) }
              key={game.id}
            />
          );
        } else {
          return null;
        }
      })
    }

    return (
      <div className="col-xs-12">
        <h1 className="MyCollection">My Collection</h1>
        {collectionComponents === 'No games yet!'
          ? <p>{collectionComponents}</p>
          : <ul>{collectionComponents}</ul>
        }
      </div>
    );
  }
};

export default MyCollection;
