import React from 'react';

import './Game.css';

class Game extends React.Component {

  addClickEvent = () => {
    this.props.addToCollection(this.props.details.id);
  };

  render () {
    const { details, userCollection } = this.props;
    console.log(userCollection);
    const gameStatus = userCollection;
    return (
      <div className="panel panel-default col-md-8 col-md-offset-2">
        <div className="panel-heading">
          <h3 className="panel-title">{details.title}</h3>
        </div>
        <div className="panel-body">
          <img src={details.poster_path} alt={details.title} className="poster" />
          <p>{details.description}</p>
          { gameStatus === 'played' ? (
            <button
              className="btn btn-default"
              disabled
            >
              In Collection
            </button>
          ) : (
            <button
              className="btn btn-default"
              onClick={this.addClickEvent}
            >
              Add to Collection
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Game;
