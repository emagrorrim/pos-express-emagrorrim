'use strict'
let express = require('express');
let database = require('./database');

let router = express.Router();

router.get('/items', (req, res) => {
  database.connect(database.queryAllItems, (doc) => {  
    res.send(doc.allItems || []);
  });
});

router.get('/cart', (req, res) => {
  database.connect(database.queryCartRecords, (doc) => {
    res.send(doc.cartRecords || []);
  });
});

router.post('/cart',  (req, res) => {
  let cartRecords = req.body.cartRecords;
  database.updateCartRecords(cartRecords, () => {
    res.send(cartRecords&&cartRecords.length ? cartRecords.length + '' : '0');
  });
});

router.delete('/cart',  (req, res) => {
  database.connect(database.clearCart, () => {
    res.send('succeed');
  })
});

router.get('/receipts',  (req, res) => {
  database.connect(database.queryReceiptList, (doc) => {
    res.send(doc.receipts || []);
  });
});

router.post('/receipts',  (req, res) => {
  let receipts = req.body.receipts;
  database.updateReceiptList(receipts, () => {
    res.send('succeed');
  });
});

module.exports = router;