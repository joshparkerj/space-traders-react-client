import fetchWithRetry from './fetch-with-retry';

const fetchPost = function fetchPost(fetchAddress, method) {
  return new Promise((resolve, reject) => {
    fetchWithRetry(fetchAddress, { method: method || 'POST' })
      .then((r) => r.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default fetchPost;
