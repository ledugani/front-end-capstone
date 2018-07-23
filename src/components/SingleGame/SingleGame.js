import React from 'react';

import './SingleGame.css';

class SingleGame extends React.Component {
  render () {
    const {game} = this.props;
    return (
      <div
        key={game.id}
        className="panel panel-default col-xs-4"
      >
        {/* <h3>{game.title}</h3>
        <img src={game.poster_path} alt={game.title} className="poster" />
        <p><strong>Developer:</strong> {game.developer}</p>
        <p><strong>Initial Release:</strong> {game.initial_release}</p>
        <p>{game.description}</p>
        <h4><span className="glyphicon glyphicon-ok"></span> {userCollection.status}</h4> */}
      </div>
    );
  }
};

export default SingleGame;