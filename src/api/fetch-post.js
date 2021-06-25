import fetchWithRetry from '../fetch-with-retry';

const fetchPost = function fetchPost(
  fetchAddress, jsonHandler, errorHandler,
) {
  fetchWithRetry(fetchAddress, { method: 'POST' })
    .then((r) => r.json())
    .then((json) => jsonHandler(json))
    .catch((error) => errorHandler(error));
};

export default fetchPost;
