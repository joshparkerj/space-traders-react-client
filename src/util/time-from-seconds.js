const timeFromSeconds = function timeFromSeconds(time) {
  const seconds = time % 60;
  if (time >= 60) {
    const minutes = Math.floor(time / 60);
    if (seconds > 0) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} and ${seconds} second${seconds === 1 ? '' : 's'}`;
    }

    return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  }

  return `${seconds} second${seconds === 1 ? '' : 's'}`;
};

export default timeFromSeconds;
