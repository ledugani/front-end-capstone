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
    const collectionComponents = this.state.collection.map((userCollection) => {
      const game = games.find(x => x.id === userCollection.gamesId);
      if (game) {
        return (
          <SingleGame
            game={game}
            userCollection={userCollection}
            key={game.id}
          />
        );
      }
      return (
        <div key="ballon">No Games Yet!</div>
      );
    })
    return (
      <div className="col-xs-12">
        <h1 className="MyCollection">My Collection</h1>
        <ul>
          {collectionComponents}
        </ul>
      </div>
    );
  }
};

export default MyCollection;
