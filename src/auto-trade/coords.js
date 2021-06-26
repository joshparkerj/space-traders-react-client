const coords = function coords(x, y) {
  return {
    x,
    y,
    distance: function distance(c) {
      return Math.sqrt(Math.abs(x ** 2 - c.x ** 2) + Math.abs(y ** 2 - c.y ** 2));
    },
  };
};

export default coords;
