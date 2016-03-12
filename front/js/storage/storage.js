function Storage() {
    
}

Storage.getAllItems = function() {
  return [
    { barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3.00 },
    { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00 },
    { barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.50 },
    { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00 },
    { barcode: 'ITEM000004', name: '电池', unit: '个', price: 2.00 },
    { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50 }
  ];
}

Storage.getTotalItemNumber = function() {
  var cartRecords = Storage.getCartRecords();
  var total = 0;
  cartRecords.forEach(function(cartRecord) {
    total += cartRecord.count;
  });
  return total;
}

Storage.getCartRecords = function() {
  var cartRecords = JSON.parse(localStorage.getItem("cartRecords"));
  return cartRecords || [];
}

Storage.setCartRecord = function(cartRecord) {

  if (cartRecord) {
    var cartRecords = Storage.updateCartRecords(cartRecord);

    localStorage.setItem("cartRecords", JSON.stringify(cartRecords));
  }
}

Storage.updateCartRecords = function(cartRecord) {
  var cartRecords = Storage.getCartRecords();
  var record = Storage.findCartRecord(cartRecord.barcode, cartRecords)

  if (record) {
    record.count = cartRecord.count;
    if (cartRecord.count == 0) {
      Storage.deleteCartRecord(record, cartRecords);
    }
  } else if(cartRecord.count != 0) {
    cartRecords.push(cartRecord);
  }
  return cartRecords;
}


Storage.findCartRecord = function(barcode, cartRecords) {

  for (var i = 0; i < cartRecords.length; i++) {

    if(cartRecords[i].barcode === barcode) {
      return cartRecords[i];
    }
  }
}

Storage.clearCart = function() {
  localStorage.setItem("cartRecords","[]");
}

Storage.deleteCartRecord = function(cartRecord, cartRecords) {
  for (var i = 0; i < cartRecords.length; i++) {
    if (cartRecords[i].barcode === cartRecord.barcode) {
      cartRecords.splice(i, 1);
      localStorage.setItem("cartRecords", JSON.stringify(cartRecords));
      return;
    }
  }
}

Storage.setCurrentReceipt = function(receipt) {
  localStorage.setItem('currentReceipt', JSON.stringify(receipt));
}

Storage.getCurrentReceipt = function() {
  return JSON.parse(localStorage.getItem('currentReceipt'));
}

Storage.storeInList = function(receipt) {
  var receipts = Storage.getReceiptList();
  receipts.push(receipt);
  Storage.setReceiptList(receipts)
}

Storage.setReceiptList = function(receipts) {
  localStorage.setItem('receiptList', JSON.stringify(receipts));
}

Storage.getReceiptList = function() {
  return JSON.parse(localStorage.getItem('receiptList')) || [];
}
