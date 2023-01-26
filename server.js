console.log('Server-side code running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.static('public'));

let db;

const url = "mongodb://localhost:27017";

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    return console.log(err);
  }
  db = client.db("bankingDatabase");
  app.listen(8080, () => {
    console.log("listening on 8080");
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/create', (req, res) => {

    //console.log(req);
    var customer_name = req.query.name;
    var starting_amount = Number(req.query.amount);
    const new_customer = {name: customer_name, balance: starting_amount};
    console.log(customer_name);

  db.collection('customers').insertOne(new_customer, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('customer added to db');
    res.sendStatus(201);
  });
});

app.post('/deposit', (req, res) => {

    console.log(req);
    var customer_name = req.query.name;
    var deposit_amount = Number(req.query.amount);
    var customer_query = {name: customer_name};
    console.log(customer_name);

    db.collection('customers').findOneAndUpdate(customer_query,[{$set: {balance: {$add: [ "$balance", deposit_amount ]}}}], {returnDocument: "after"},(err, data) => {
        if (err) return console.log(err);
        res.json(data);
    });
});

app.post('/withdraw', (req, res) => {

    console.log(req);
    var customer_name = req.query.name;
    var withdraw_amount = Number(req.query.amount);
    var customer_query = {name: customer_name};
    console.log(customer_name);

    db.collection('customers').findOneAndUpdate(customer_query, [{$set: {balance: {$subtract: [ "$balance", withdraw_amount ]}}}], {returnDocument: "after"},(err, data) => {
        if (err) return console.log(err);
        res.json(data);
    });
});

app.get('/balance', (req, res) => {
    var customer_name = req.query.name;
    console.log(customer_name);

    db.collection('customers').findOne({name: customer_name}, function (err, data) {
        if (err) return console.log(err);
        res.json(data);
    });
});
