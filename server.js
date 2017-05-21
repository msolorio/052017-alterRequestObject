const express = require('express');

const app = express();

// middleware to log request information
function logRequestInfo(request, response, next) {
  const now = new Date;
  console.log(`///////////////////\nRequest Info:\n${now.toLocaleDateString()}\n${now.toLocaleTimeString()}\n${request.method}\n${request.url}\n///////////////////`);

  next();
}

const spices = [
  'paprika',
  'himalayan pink salt',
  'lemon pepper',
  'safron',
  'whole peppercorn',
  'oregano',
  'bay leaves',
  'tahini'
];

function getRandomSpice(spices) {
  return spices[Math.floor(Math.random() * spices.length)];
}

// middleware to alter request object
function addSpiceToRequest(request, response, next) {
  request.spice = getRandomSpice(spices);

  next();
}

app.use(logRequestInfo);

app.use(addSpiceToRequest);

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
  console.log(`request.spice: ${request.spice}\n///////////////////`);
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
