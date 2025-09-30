'use strict';

const express = require('express');
const os = require('os');   // <--- IMPORTANTE

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Middleware per disabilitare keep-alive
app.use((req, res, next) => {
  res.set('Connection', 'close');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello world 2: ' + os.hostname() + ' on ' + os.platform() + '!');
  console.log('Request handled by', os.hostname());
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});