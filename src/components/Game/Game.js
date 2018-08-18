import React from 'react';

import './Game.css';

class Game extends React.Component {

  addClickEvent = () => {
    this.props.addToCollection(this.props.details.id, this.props.details.title);
  };

  render () {
    const { details } = this.props;
    // collection.map((game) => {
    //   if (details.title === game)
    //   return game;
    // })
    return (
      <div className="panel panel-default col-md-8 col-md-offset-2">
        <div className="panel-heading">
          <h3 className="panel-title">{details.title}</h3>
        </div>
        <div className="panel-body">
          <img src={details.poster_path} alt={details.title} className="poster item" />
          <p className="item">{details.description}</p>
          <button
            className="btn btn-default item"
            onClick={this.addClickEvent}
          >
            Add to Collection
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
