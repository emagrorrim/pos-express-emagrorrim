var url = 'http://localhost:8080'
function Storage() {}

Storage.getAllItems = function(callBack) {
  var allItems;
  $.ajax({
    method: "GET",
    url: url + '/allItems',
  })
  .done(function( data ) {
    allItems = JSON.parse(data);
    Storage.setLocalAllItems(allItems);
    callBack(allItems);
  });
  // var allItems = [
  //   { barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3.00 },
  //   { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00 },
  //   { barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.50 },
  //   { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00 },
  //   { barcode: 'ITEM000004', name: '电池', unit: '个', price: 2.00 },
  //   { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50 }
  // ];
  
}

Storage.setLocalAllItems = function(allItems) {
  localStorage.setItem('allItems', JSON.stringify(allItems));
}

Storage.getLocalAllItems = function() {
  return JSON.parse(localStorage.getItem('allItems'));
}

Storage.getCartCount = function(callBack) {
  Storage.getCartRecords(function(cartRecords) {
    var total = 0;
    cartRecords.forEach(function(cartRecord) {
      total += cartRecord.count;
    });
    callBack(total);
  });
}

Storage.setCartRecord = function(cartRecord, callBack) {
  Storage.updateCartRecords(cartRecord);
  callBack();
}

Storage.updateCartRecords = function(cartRecord) {
  
  Storage.getCartRecords(function(cartRecords) {
    var record = Storage.findCartRecord(cartRecord.barcode, cartRecords)

    if (record) {
      record.count = cartRecord.count;
      if (cartRecord.count === 0) {
        Storage.deleteCartRecord(record, cartRecords);
      }
    } else if(cartRecord.count !== 0) {
      cartRecords.push(cartRecord);
    }
    localStorage.setItem("cartRecords", JSON.stringify(cartRecords));
  });
  
}

Storage.findCartRecord = function(barcode, cartRecords) {

  for (var i = 0; i < cartRecords.length; i++) {

    if(cartRecords[i].barcode === barcode) {
      return cartRecords[i];
    }
  }
}

Storage.getCartRecords = function(callBack) {
  var cartRecords = JSON.parse(localStorage.getItem("cartRecords")) || [];
  callBack(cartRecords);
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

Storage.storeInList = function(receipt, callBack) {
  Storage.getReceiptList(function(receipts) {
    receipts.push(receipt);
    Storage.setReceiptList(receipts)
  });
}

Storage.setReceiptList = function(receipts) {
  localStorage.setItem('receiptList', JSON.stringify(receipts));
}

Storage.getReceiptList = function(callBack) {
  var receiptList = JSON.parse(localStorage.getItem('receiptList')) || [];
  callBack(receiptList);
}
