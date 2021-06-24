const fetchWithRetry = function fetchWithRetry(fetchAddress, fetchOptions, seconds = 1) {
  return new Promise((resolve, reject) => {
    fetch(fetchAddress, fetchOptions)
      .then((r) => {
        if (r.status === 200) {
          resolve(r);
        } else if (r.status === 429) {
          setTimeout(() => resolve(fetchWithRetry(fetchAddress, fetchOptions, seconds + 1)), 1000 * seconds * r.headers.get('retry-after'));
        } else {
          reject();
        }
      });
  });
};

export default fetchWithRetry;
