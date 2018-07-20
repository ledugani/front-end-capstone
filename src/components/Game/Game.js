import React from 'react';

import './Game.css';

class Game extends React.Component {
  render () {
    const { details } = this.props;
    return (
      <div className="panel panel-default col-md-8 col-md-offset-2">
        <div className="panel-heading">
          <h3 className="panel-title">{details.title}</h3>
        </div>
        <div className="panel-body">
          <img src={details.poster_path} alt={details.title} className="poster" />
          <p>{details.description}</p>
          <button className="btn btn-default">
            Add to Collection
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
