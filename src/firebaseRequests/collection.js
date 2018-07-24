import axios from 'axios';
import constants from '../constants';

const getRequest = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/userGames.json?orderBy="uid"&equalTo="${uid}"`)
      .then(res => {
        const collection = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            collection.push(res.data[fbKey]);
          });
        }
        resolve(collection);
      })
      .catch(err => {
        reject(err);
      })
  });
};

const deleteGame = (gameId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/userGames/${gameId}.json`)
      .then((res) => {
        resolve(res);
      })
      .catch((errr) => {
        reject(errr);
      })
  });
};

export default { getRequest, deleteGame };
