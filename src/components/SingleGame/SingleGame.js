import React from 'react';

import collectionRequests from '../../firebaseRequests/collection';

import './SingleGame.css';

class SingleGame extends React.Component {
  deleteGameClick = () => {
    const firebaseId = this.props.userCollection.id;
    collectionRequests
      .deleteGame(firebaseId)
      .then(() => {
        collectionRequests.getRequest();
      })
      .catch((err) => {
        console.error('There was a problem with delete request -> ', err);
      })
  }

  render () {
    const {game, userCollection} = this.props;
    return (
      <div
          key={game.id}
          className="panel panel-default col-xs-4"
      >
        <span
          className="x btn text-right pull-right"
          onClick={this.deleteGameClick}
          gameid={game.id}
        >
          &#10005;
        </span>
        <h3>{game.title}</h3>
        <img src={game.poster_path} alt={game.title} className="poster" />
        <p><strong>Developer:</strong> {game.developer}</p>
        <p><strong>Initial Release:</strong> {game.initial_release}</p>
        <p>{game.description}</p>
        <h4><span className="glyphicon glyphicon-ok"></span> {userCollection.status}</h4>
      </div>
    );
  }
};

export default SingleGame;