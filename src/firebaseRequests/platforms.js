import axios from 'axios';
import constants from '../constants';

const getRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/platforms.json`)
      .then(results => {
        const platforms = [];
        if (results.data !== null) {
          Object.keys(results.data).forEach(fbKey => {
            results.data[fbKey].id = fbKey;
            platforms.push(results.data[fbKey]);
          });
        }
        resolve(platforms);
      })
      .catch(errrorr => {
        reject(errrorr);
      });
  });
};

export default { getRequest };
