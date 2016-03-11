function getAllItems() {
  return [
    { barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3.00 },
    { barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00 },
    { barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.50 },
    { barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00 },
    { barcode: 'ITEM000004', name: '电池', unit: '个', price: 2.00 },
    { barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50 }
  ];
}

function getTotalItemNumber() {
  var cartRecords = getCartRecords();
  var total = 0;
  cartRecords.forEach(function(cartRecord) {
    total += cartRecord.count;
  });
  return total;
}

function getCartRecords() {
  var cartRecords = JSON.parse(localStorage.getItem("cartRecords"));
  return cartRecords || [];
}

function setCartRecord(cartRecord) {

  if (cartRecord) {
    var cartRecords = updateCartRecords(cartRecord);

    localStorage.setItem("cartRecords", JSON.stringify(cartRecords));
  }
}

function updateCartRecords(cartRecord) {
  var cartRecords = getCartRecords();
  var record = findCartRecord(cartRecord.barcode, cartRecords)

  if (record) {
    record.count = cartRecord.count;
    if (cartRecord.count == 0) {
      deleteCartRecord(record, cartRecords);
    }
  } else if(cartRecord.count != 0) {
    cartRecords.push(cartRecord);
  }
  return cartRecords;
}


function findCartRecord(barcode, cartRecords) {

  for (var i = 0; i < cartRecords.length; i++) {

    if(cartRecords[i].barcode === barcode) {
      return cartRecords[i];
    }
  }
}

function clearCart() {
  localStorage.setItem("cartRecords","[]");
}

function deleteCartRecord(cartRecord, cartRecords) {
  for (var i = 0; i < cartRecords.length; i++) {
    if (cartRecords[i].barcode === cartRecord.barcode) {
      cartRecords.splice(i, 1);
      localStorage.setItem("cartRecords", JSON.stringify(cartRecords));
      return;
    }
  }
}

function setCurrentReceipt(receipt) {
  localStorage.setItem('currentReceipt', JSON.stringify(receipt));
}

function getCurrentReceipt() {
  return JSON.parse(localStorage.getItem('currentReceipt'));
}

function storeInList(receipt) {
  var receipts = getReceiptList();
  receipts.push(receipt);
  setReceiptList(receipts)
}

function setReceiptList(receipts) {
  localStorage.setItem('receiptList', JSON.stringify(receipts));
}

function getReceiptList() {
  return JSON.parse(localStorage.getItem('receiptList')) || [];
}
