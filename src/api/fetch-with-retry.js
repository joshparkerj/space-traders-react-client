const fetchWithRetry = function fetchWithRetry(fetchAddress, fetchOptions, seconds = 1) {
  return new Promise((resolve, reject) => {
    fetch(fetchAddress, fetchOptions)
      .then((r) => {
        if (r.status === 200 || r.status === 201) {
          resolve(r);
        } else if (r.status === 409) {
          setTimeout(() => (
            resolve(fetchWithRetry(fetchAddress, fetchOptions, seconds + 1))
          ), 1000 * seconds);
        } else if (r.status === 429) {
          setTimeout(() => resolve(fetchWithRetry(fetchAddress, fetchOptions, seconds + 1)), 1000 * seconds * r.headers.get('retry-after'));
        } else if (r.status === 400) {
          r.json()
            .then((j) => {
              if (j && j.error && j.error.message === 'Quantity exceeds available cargo space on ship.') {
                setTimeout(() => (
                  resolve(fetchWithRetry(fetchAddress, fetchOptions, seconds + 1))
                ), 1000 * seconds);
              } else {
                reject(j.error);
              }
            });
        }
      });
  });
};

export default fetchWithRetry;
