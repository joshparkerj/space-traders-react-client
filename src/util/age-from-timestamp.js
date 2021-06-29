const ageFromTimestamp = function ageFromTimestamp(ts) {
  // expected timestamp format is ISO e.g. 2021-06-29T00:38:42.325Z
  const daysOld = Math.floor((Date.now() - Date.parse(ts)) / (24 * 60 * 60 * 1000));
  return `${daysOld} day${daysOld === 1 ? '' : 's'} old`;
};

export default ageFromTimestamp;
