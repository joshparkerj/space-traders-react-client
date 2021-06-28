// takes an array of *uncalled* functions that return promises
// then chains them and returns the promise at the end of the chain.
// (Using Promise.all is ineffective with the space traders api
// because it'll either get rate-limited
// or buy orders and sell orders will go out of order or collide)
// This function is based on the stackoverflow comment at https://stackoverflow.com/a/21372567/13920055
const chainPromises = function chainPromises(promises) {
  return promises.reduce((acc, e) => acc.then(e), Promise.resolve());
};

export default chainPromises;
