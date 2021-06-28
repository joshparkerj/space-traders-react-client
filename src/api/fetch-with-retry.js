const fetchWithRetry = function fetchWithRetry(fetchAddress, fetchOptions, seconds = 1) {
  const corsOptions = { ...fetchOptions, mode: 'cors' };
  return new Promise((resolve, reject) => {
    fetch(fetchAddress, corsOptions)
      .then((r) => {
        if (r.status === 200 || r.status === 201) {
          resolve(r);
        } else if (r.status === 409) {
          setTimeout(() => (
            resolve(fetchWithRetry(fetchAddress, corsOptions, seconds + 1))
          ), 1000 * seconds);
        } else if (r.status === 429) {
          setTimeout(() => resolve(fetchWithRetry(fetchAddress, corsOptions, seconds + 1)), 1000 * seconds * r.headers.get('retry-after'));
        } else if (r.status === 400) {
          r.json()
            .then((j) => {
              if (j && j.error && j.error.message === 'Quantity exceeds available cargo space on ship.') {
                setTimeout(() => (
                  fetchWithRetry(fetchAddress, corsOptions, seconds + 1)
                    .then((res) => resolve(res))
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
