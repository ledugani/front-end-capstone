import axios from 'axios';
import constants from '../constants';

const getRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/all-games/games.json`)
      .then(results => {
        const games = [];
        if (results.data !== null) {
          Object.keys(results.data).forEach(fbKey => {
            results.data[fbKey].id = fbKey;
            games.push(results.data[fbKey]);
          });
        }
        resolve(games);
      })
      .catch(errrorr => {
        reject(errrorr);
      });
  });
};

export default { getRequest };
