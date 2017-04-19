'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));

app.get('/', (req, res) => {
  res.status(200).send('Hello, Express.js');
});

app.get('/hello', (req, res) => {
  res.status(200).send('Hello stranger!');
});

app.get('/hello/:name', (req, res) => {
  res.status(200).send(`Hello, ${req.params.name}`);
});

app.all('/sub/*', (req, res) => {
  res.status(200).send(`You requested URI: ${req.url}`);
});

app.post('/post', (req, res) => {
  if (req.body && Object.keys(req.body).length > 0) {
    res.json(req.body);
  } 
  else {
    res.status(404).send('404 Not Found');
  }
});

app.use((req, res, next) => {
  var err = new Error('404 Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});