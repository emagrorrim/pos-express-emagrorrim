var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/no-money-shop';

function connect(databaseFunc, callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    databaseFunc(db, function(doc) {
      callback(doc);
      db.close();
    });
  });
}

function queryAllItems(db, callback) {
   db.collection('allitems').findOne(function(err, doc) {
     if (doc) {
       callback(doc);
     } else {
       callback({});
     }
   });
};

function queryCartRecords(db, callback) {
   db.collection('cartrecords').findOne(function(err, doc) {
     if (doc) {
       callback(doc);
     } else {
       callback({});
     }
   });
};

function updateCartRecords(cartRecords, callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('cartrecords').findOne(function(err, doc) {
      if (doc) {
        db.collection('cartrecords').update({}, {'cartRecords':cartRecords});
      } else {
        db.collection('cartrecords').insert({'cartRecords':cartRecords});
      }
      db.close();
      callback();
    });
  });
}

function clearCart(db, callback) {
  db.collection('cartrecords').remove({});
  callback();
}

function queryReceiptList(db, callback) {
   db.collection('receipts').findOne(function(err, doc) {
     if (doc) {
       callback(doc);
     } else {
       callback({});
     }
   });
};

function updateReceiptList(receipts, callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('receipts').findOne(function(err, doc) {
      if (doc) {
        db.collection('receipts').update({}, {'receipts':receipts});
      } else {
        db.collection('receipts').insert({'receipts':receipts});
      }
      db.close();
      callback();
    });
  });
}

exports.connect = connect;
exports.queryAllItems = queryAllItems;
exports.queryCartRecords = queryCartRecords;
exports.updateCartRecords = updateCartRecords;
exports.clearCart = clearCart;
exports.queryReceiptList = queryReceiptList;
exports.updateReceiptList = updateReceiptList;