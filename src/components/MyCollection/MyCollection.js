import React from 'react';
// import { Link } from 'react-router-dom';

import collectionRequests from '../../firebaseRequests/collection';
import authRequest from '../../firebaseRequests/auth';
import './MyCollection.css';

class MyCollection extends React.Component {
  state = {
    collection: [],
  }

  componentDidMount () {
    collectionRequests
      .getRequest(authRequest.getUid())
      .then((collection) => {
        this.setState({collection});
      })
      .catch((errr) => {
        console.error('There was a problem with the user collection get request: ', errr);
      })
  }

  render () {
    const collectionComponents = this.state.collection.map((game) => {
      return (
        <div
          key={game.id}
          className="col-xs-12"
        >
          {game.title}
        </div>
      );
    })
    return (
      <div className="MyCollection col-xs-12">
        <h1>My Collection</h1>
        <ul>
          {collectionComponents}
        </ul>
      </div>
    );
  }
};

export default MyCollection;
