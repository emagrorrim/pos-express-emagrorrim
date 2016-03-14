function generateReceipt(cartRecords, allItems) {
  var cartItems = getCartItems(cartRecords, allItems);
  var receiptItems = getReceiptItems(cartItems);
  return getReceipt(receiptItems);
}

function getCartItems(cartRecords, allItems) {

  var cartItems = [];
  for (var i = 0; i < cartRecords.length; i++) {
    var item = getItem(cartRecords[i].barcode, allItems);
    cartItems.push({ item: item, count: cartRecords[i].count });
  }
  return cartItems;
}

function getItem(barcode, allItems) {
  for (var i = 0; i < allItems.length; i++) {
    if (allItems[i].barcode === barcode) {
      return allItems[i];
    }
  }
}

function getReceiptItems(cartItems) {
  var receiptItems = [];
  cartItems.forEach(function(cartItem) {
    receiptItems.push({ cartItem:cartItem, total:cartItem.item.price * cartItem.count});
  });
  return receiptItems;
}

function getReceipt(receiptItems) {
  var total = 0;
  receiptItems.forEach(function(receiptItem) {
    total += receiptItem.total;
  });

  return { receiptItems: receiptItems, total: total, date: Date() }
}
