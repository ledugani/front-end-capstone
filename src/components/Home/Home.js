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
        <div class="panel panel-default col-xs-4 sidescroll">
          <div class="panel-heading">
            <h3 class="panel-title">{game.title}</h3>
          </div>
          <div class="panel-body">
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
          <body>
            <ul className="games">
              {gameComponents}
            </ul>
          </body>
        </div>
      </div>
    );
  }
};

export default Home;
