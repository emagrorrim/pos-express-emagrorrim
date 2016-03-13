var cors = require('cors')
var express = require('express');
var app = express();
app.use(cors());

app.get('/', function(req, res) {
  res.sendfile('./front/index.html');
});

app.get('/allItems', function (req, res) {
  var allItems = [
    { barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3.00 },
    { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00 },
    { barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.50 },
    { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00 },
    { barcode: 'ITEM000004', name: '电池', unit: '个', price: 2.00 },
    { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50 }
  ];
  res.send(JSON.stringify(allItems));
  console.log(req + res);
});

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});