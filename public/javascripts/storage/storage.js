var url = 'http://localhost:8080'
function Storage() {}

Storage.getAllItems = function(callBack) {
  $.get('/api/items', function(allItems) {
    Storage.setLocalAllItems(allItems);
    callBack(allItems);
  })
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
      total += parseFloat(cartRecord.count);
    });
    callBack(total);
  });
}

Storage.setCartRecord = function(cartRecord, callBack) {
  Storage.getCartRecords(function(cartRecords) {
    operateCartRecords(cartRecord, cartRecords);
    postCartRecords(cartRecords, callBack);
  });
}

function operateCartRecords(cartRecord, cartRecords) {
  var record = Storage.findCartRecord(cartRecord.barcode, cartRecords)
  if (record) {
      record.count = cartRecord.count;
      if (cartRecord.count === 0) {
        Storage.deleteCartRecord(record, cartRecords);
      }
    } else if (cartRecord.count !== 0) {
      cartRecords.push(cartRecord);
    }
}

function postCartRecords(cartRecords, callBack) {
  $.post('/api/cart', {cartRecords:cartRecords}, function(total) {
      callBack(total);
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
  $.get('/api/cart', function(cartRecords) {
    callBack(cartRecords);
  });
}

Storage.clearCart = function(callBack) {
  $.ajax({
    url: '/api/cart',
    type: 'DELETE',
    success: function(data) {
      callBack();
    }
  });
}

Storage.deleteCartRecord = function(cartRecord, cartRecords) {
  for (var i = 0; i < cartRecords.length; i++) {
    if (cartRecords[i].barcode === cartRecord.barcode) {
      cartRecords.splice(i, 1);
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
    Storage.setReceiptList(receipts, callBack)
  });
}

Storage.setReceiptList = function(receipts, callBack) {
  $.post('/api/receipts', {receipts:receipts}, function(data) {
      callBack();
    });
}

Storage.getReceiptList = function(callBack) {
  $.get('/api/receipts', function(receiptList) {
    callBack(receiptList);
  });
}
