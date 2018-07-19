import React from 'react';
import gameRequests from '../../firebaseRequests/games';

import './Search.css';

class Search extends React.Component {
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
        console.error('There was a problem requesting game info.', err);
      })
  }

  render () {
    const gameComponents = this.state.games.map((game) => {
      return (
        <h2>{game.title}</h2>
      )
    })
    return (
      <div className="search-component">
        <div className="Search">
          <h1>Search</h1>
        </div>
        <div className="More">
          <h1>More Games</h1>
          <ul className="games">
            {gameComponents}
          </ul>
        </div>
      </div>
    );
  }
};

export default Search;
