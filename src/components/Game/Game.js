import React from 'react';

import './Game.css';

class Game extends React.Component {
  addClickEvent = () => {
    console.error('game', this.props.details.id);
    // this.props.addToCollection(this.props.details.id);

  };

  render () {
    const { details } = this.props;
    const gameStatus = details.status === 'played' || 'owned' || 'want';
    return (
      <div className="panel panel-default col-md-8 col-md-offset-2">
        <div className="panel-heading">
          <h3 className="panel-title">{details.title}</h3>
        </div>
        <div className="panel-body">
          <img src={details.poster_path} alt={details.title} className="poster" />
          <p>{details.description}</p>
          <button
            className="btn btn-default"
            onClick={this.addClickEvent}
          >
            { gameStatus ? 'Add to Collection' : 'In Collection'}
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
