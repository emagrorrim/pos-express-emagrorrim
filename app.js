'use strict'
let cors = require('cors');
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let database = require('./database');

let app = express();

app.use(cors());
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendfile('./public/index.html');
});

app.get('/cart', (req, res) => {
  res.sendfile('./public/html/cart.html');
});

app.get('/receipt', (req, res) => {
  res.sendfile('./public/html/receipt.html');
});

app.get('/receipt-list', (req, res) => {
  res.sendfile('./public/html/receipt-list.html');
});

app.get('/api/allItems', (req, res) => {
  database.connect(database.queryAllItems, (doc) => {  
    res.send(doc.allItems || []);
  });
});

app.get('/api/cartRecords', (req, res) => {
  database.connect(database.queryCartRecords, (doc) => {
    res.send(doc.cartRecords || []);
  });
});

app.get('/api/clear',  (req, res) => {
  database.connect(database.clearCart, () => {
    res.send('succeed');
  })
});

app.post('/api/cartRecords',  (req, res) => {
  let cartRecords = req.body.cartRecords;
  database.updateCartRecords(cartRecords, () => {
    res.send('succeed');
  });
});

app.get('/api/receiptList',  (req, res) => {
  database.connect(database.queryReceiptList, (doc) => {
    res.send(doc.receipts || []);
  });
});

app.post('/api/receiptList',  (req, res) => {
  let receipts = req.body.receipts;
  database.updateReceiptList(receipts, () => {
    res.send('succeed');
  });
});

app.listen(8080,  () => {
  console.log('App listening on port 8080!');
});