'use strict'
let express = require('express');
let database = require('./database');

let router = express.Router();

router.get('/allItems', (req, res) => {
  database.connect(database.queryAllItems, (doc) => {  
    res.send(doc.allItems || []);
  });
});

router.get('/cartRecords', (req, res) => {
  database.connect(database.queryCartRecords, (doc) => {
    res.send(doc.cartRecords || []);
  });
});

router.post('/cartRecords',  (req, res) => {
  let cartRecords = req.body.cartRecords;
  database.updateCartRecords(cartRecords, () => {
    res.send(cartRecords&&cartRecords.length ? cartRecords.length + '' : '0');
  });
});

router.get('/clear',  (req, res) => {
  database.connect(database.clearCart, () => {
    res.send('succeed');
  })
});

router.get('/receiptList',  (req, res) => {
  database.connect(database.queryReceiptList, (doc) => {
    res.send(doc.receipts || []);
  });
});

router.post('/receiptList',  (req, res) => {
  let receipts = req.body.receipts;
  database.updateReceiptList(receipts, () => {
    res.send('succeed');
  });
});

module.exports = router;