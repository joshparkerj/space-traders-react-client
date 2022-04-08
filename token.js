const { request } = require('https');
const { writeFile } = require('fs/promises');

const username = require('./username.json');

const options = {
  hostname: 'api.spacetraders.io',
  path: `/users/${username}/claim`,
  method: 'POST',
};

const req = request(options, (res) => {
  res.on('data', (d) => {
    const { token } = JSON.parse(d.toString());
    writeFile('src/api/space-traders-api-acess-token.json', JSON.stringify(token));
  });
});

req.end();
