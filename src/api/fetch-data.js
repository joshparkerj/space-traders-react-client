import fetchWithRetry from './fetch-with-retry';

const fetchData = function fetchData(fetchAddress, setter, arrayName, idField) {
  return new Promise((resolve, reject) => {
    let getId;
    if (typeof idField === 'string') {
      getId = function getIdByString(e) {
        return e[idField];
      };
    } else if (typeof idField === 'function') {
      getId = idField;
    } else if (idField === undefined) {
      fetchWithRetry(fetchAddress)
        .then((r) => r.json())
        .then((jsonResponse) => { setter(jsonResponse[arrayName]); resolve(jsonResponse); })
        .catch((err) => reject(err));
    } else {
      throw new Error('idField must be string or function');
    }

    if (getId) {
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
            setter((oldData) => {
              if (Array.isArray(oldData)) {
                return [
                  ...oldData,
                  ...(oldData.map((e) => getId(e)).includes(getId(jsonResponse[arrayName]))
                    ? []
                    : [jsonResponse[arrayName]]
                  ),
                ];
              }

              return jsonResponse[arrayName];
            });
          }
          resolve(jsonResponse);
        })
        .catch((err) => reject(err));
    }
  });
};

export default fetchData;
