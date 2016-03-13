var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser')
var database = require('./database');

var app = express();

app.use(cors());
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res) {
  res.sendFile('./front/index.html');
});

app.get('/allItems', function (req, res) {
  database.connect(database.queryAllItems, function(doc) {  
    res.send(doc.allItems || []);
  });
});

app.get('/cartRecords', function (req, res) {
  database.connect(database.queryCartRecords, function(doc) {
    res.send(doc.cartRecords || []);
  });
});

app.get('/clear', function (req, res) {
  database.connect(database.clearCart, function() {
    res.send('succeed');
  })
});

app.post('/cartRecords', function (req, res) {
  var cartRecords = req.body.cartRecords;
  database.updateCartRecords(cartRecords, function() {
    res.send('succeed');
  });
});

app.get('/receiptList', function (req, res) {
  database.connect(database.queryReceiptList, function(doc) {
    res.send(doc.receipts || []);
  });
});

app.post('/receiptList', function (req, res) {
  var receipts = req.body.receipts;
  database.updateReceiptList(receipts, function() {
    res.send('succeed');
  });
});

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});