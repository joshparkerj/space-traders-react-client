import fetchWithRetry from './fetch-with-retry';

const fetchPost = function fetchPost(fetchAddress) {
  return new Promise((resolve, reject) => {
    fetchWithRetry(fetchAddress, { method: 'POST' })
      .then((r) => {
        console.log('fetch with retry has resolved');
        return r.json();
      })
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default fetchPost;
