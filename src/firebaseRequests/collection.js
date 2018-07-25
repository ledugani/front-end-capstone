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

const postRequest = (game) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/userGames.json`, game)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      })
  });
};

const deleteGame = (userGameId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/userGames/${userGameId}.json`)
      .then((res) => {
        resolve(res);
      })
      .catch((errr) => {
        reject(errr);
      })
  });
};

export default { getRequest, deleteGame, postRequest };
