var moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url:`https://www.google.com/maps?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage,generateLocationMessage};
