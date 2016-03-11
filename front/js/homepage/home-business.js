function getPurchasedCount(barcode, cartRecords) {

  for (var i = 0; i < cartRecords.length; i++) {

    var cartRecord = cartRecords[i];
    if (cartRecord.barcode === barcode) {
      return cartRecord.count;
    }
  }
  return 0;
}
