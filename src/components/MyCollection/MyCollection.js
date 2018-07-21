import React from 'react';

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
      console.error(game);
      if (game) {
        return (
          <div
            key={game.id}
            className="panel panel-default col-xs-4"
          >
            <h3>{game.title}</h3>
            <img src={game.poster_path} alt={game.title} className="poster" />
            <p><strong>Developer:</strong> {game.developer}</p>
            <p><strong>Initial Release:</strong> {game.initial_release}</p>
            <p>{game.description}</p>
            <h4><span className="glyphicon glyphicon-ok"></span> {userCollection.status}</h4>
          </div>
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
