import React from 'react';
import collectionRequests from '../../firebaseRequests/collection';
import Rating from 'react-rating';
import './SingleGame.css';

class SingleGame extends React.Component {
  state = {
    userGame: {
      gamesId: '',
      status: '',
      uid: '',
      rating: 0,
    }
  }

  changeRating = (x) => {
    const tempGame = {...this.state.userGame};
    tempGame.rating = x;
    this.setState({userGame: tempGame});
    this.updateGame(tempGame);
  }

  updateToPlayed = () => {
    const tempGame = {...this.state.userGame};
    tempGame.status = 'played';
    this.setState({userGame: tempGame});
    this.updateGame(tempGame);
  }

  updateGame = (tempGame) => {
    collectionRequests
      .putRequest( this.state.userGame.id, tempGame )
      .then(() => {
        collectionRequests.getRequest();
      })
      .catch((er) => {
        console.error(er);
      });
  }

  deleteGameClick = () => {
    const firebaseId = this.props.userCollection.id;
    collectionRequests
      .deleteGame(firebaseId)
      .then(() => {
        this.props.removeGame(firebaseId);
      })
      .catch((err) => {
        console.error('There was a problem with delete request -> ', err);
      })
  }

  componentDidMount () {
    this.setState({userGame: this.props.userCollection});
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
        <h3 className="all">{game.title}</h3>
        <img src={game.poster_path} alt={game.title} className="poster" />
        <br />
        <Rating
          emptySymbol="glyphicon glyphicon-heart-empty"
          fullSymbol="glyphicon glyphicon-heart"
          initialRating={this.state.userGame.rating}
          onChange={this.changeRating}
        />
        <p><strong>Developer:</strong> {game.developer}</p>
        <p><strong>Initial Release:</strong> {game.initial_release}</p>
        <p className="all">{game.description}</p>
        <h4><span className="glyphicon glyphicon-ok"></span> {this.state.userGame.status} </h4>
        <button className="btn btn-default played" onClick={() => this.updateToPlayed(userCollection.id)}>Played</button>
      </div>
    );
  }
};

export default SingleGame;