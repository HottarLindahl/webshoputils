const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./controller');

const app = express();
const port = process.env.PORT || 4000;
const controller = new Controller.Controller();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.post('/api/product/search', async (req, res) => {
  //console.log(req.body);
  //console.log(req)
  const prod = await controller.SearchProduct(req.body.post)
  res.send(prod)});

app.listen(port, () => console.log(`Listening on port ${port}`));