import axios from 'axios';
import constants from '../constants';

const getRequest = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/collections/user-collections.json?orderBy="uid"&equalTp="${uid}"`)
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

export default { getRequest };
