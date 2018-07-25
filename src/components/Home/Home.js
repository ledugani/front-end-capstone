import React from 'react';

import gameRequests from '../../firebaseRequests/games';
import './Home.css';

class Home extends React.Component {
  state = {
    games: [],
  }

  componentDidMount () {
    gameRequests
      .getRequest()
      .then((games) => {
        this.setState({games});
      })
      .catch((err) => {
        console.error('error with games get request', err);
      })
  }

  render () {
    const gameComponents = this.state.games.map((game) => {
      return (
        <div
          className="panel panel-default col-xs-4 sidescroll"
          key={game.id}
        >
          <div className="panel-heading">
            <h3 className="panel-title">{game.title}</h3>
          </div>
          <div className="panel-body">
            <img src={game.poster_path} alt={game.title} className="gamePoster" />
            <p>{game.description}</p>
          </div>
        </div>

      );
    });

    return (
      <div className="Home">
        <div className="menu">
          <header>
            <h1>GameSphere</h1>
            <h3>It's spherical. SPHERICAL!</h3>
          </header>
          <div>
            <ul className="games">
              {gameComponents}
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
