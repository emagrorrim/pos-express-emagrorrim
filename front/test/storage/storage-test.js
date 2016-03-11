describe('storage', function() {

  it('getCartRecords should return cartRecords', function() {

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([
      { barcode: "ITEM000002", count: 1 },
      { barcode: "ITEM000001", count: 1 }
    ]));

    var cartRecords = getCartRecords();

    var expectCartRecords = [
      { barcode: "ITEM000002", count: 1 },
      { barcode: "ITEM000001", count: 1 }
    ];

    expect(cartRecords).toEqual(expectCartRecords);
  });

  it('findCartRecord should find record you need', function() {

    var barcode = 'ITEM000001';
    var cartRecords = [
      { barcode: "ITEM000002", count: 1 },
      { barcode: "ITEM000001", count: 1 }
    ];

    var cartRecord = findCartRecord(barcode, cartRecords);

    var expectCartRecord = { barcode: "ITEM000001", count: 1 };

    expect(cartRecord).toEqual(expectCartRecord);

  });

  it('deleteCartRecord should delete cart record', function() {

    var record = { barcode: "ITEM000002", count: 1 };
    var cartRecords = [{ barcode: "ITEM000002", count: 1 }, { barcode: "ITEM000001", count: 1 }];

    deleteCartRecord(record, cartRecords);

    var expectCartRecords = [{ barcode: "ITEM000001", count: 1 }];

    expect(cartRecords).toEqual(expectCartRecords);

  });
});
