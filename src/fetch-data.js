import fetchWithRetry from './fetch-with-retry';

const fetchData = function fetchData(fetchAddress, setter, arrayName, idField) {
  let getId;
  if (typeof idField === 'string') {
    getId = function getIdByString(e) {
      return e[idField];
    };
  } else if (typeof idField === 'function') {
    getId = idField;
  } else if (idField === undefined) {
    return new Promise((resolve, reject) => {
      fetchWithRetry(fetchAddress)
        .then((r) => r.json())
        .then((jsonResponse) => setter(jsonResponse[arrayName]))
        .then(() => resolve())
        .catch(() => reject());
    });
  } else {
    throw new Error('idField must be string or function');
  }

  return new Promise((resolve, reject) => {
    fetchWithRetry(fetchAddress)
      .then((r) => r.json())
      .then((jsonResponse) => {
        if (Array.isArray(jsonResponse[arrayName])) {
          setter((oldData) => [
            ...oldData,
            ...(jsonResponse
              ? jsonResponse[arrayName]
                .filter((newDatum) => !oldData.map((e) => getId(e)).includes(getId(newDatum)))
              : []),
          ]);
        } else {
          setter((oldData) => [
            ...oldData,
            ...(oldData.map((e) => getId(e)).includes(getId(jsonResponse[arrayName]))
              ? []
              : [jsonResponse[arrayName]]
            ),
          ]);
        }
      })
      .then(() => resolve())
      .catch(() => reject());
  });
};

export default fetchData;
