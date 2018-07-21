import React from 'react';

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
        console.error('There was a problem with the user collection get request -> ', errr);
      })
  }

  render () {
    const collectionComponents = this.state.collection.map((userCollection) => {
      return (
        <button
          key={userCollection.id}
        >
          {userCollection.id}
        </button>
      );
    })
    return (
      <div className="col-xs-12">
        <h1 className="MyCollection">My Collection</h1>
        <ul>
          {collectionComponents}
        </ul>
      </div>
    );
  }
};

export default MyCollection;
