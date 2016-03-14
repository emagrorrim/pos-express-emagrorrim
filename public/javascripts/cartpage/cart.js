$(document).ready(function() {
  setupUI();
});

function setupUI() {
  setupCartCount();
  setupTotalPrice();
  setupList();
}

function setupList() {
  Storage.getCartRecords(setItemsList);
}

function setupCartCount() {
  Storage.getCartCount(setCartCount);
}

function setCartCount(total) {
  $('#cartCount').html(total);
}

function setItemsList(cartRecords) {
  var allItems = Storage.getLocalAllItems();
  cartRecords.forEach(function(cartRecord) {
      
    var item = getItem(cartRecord.barcode, allItems);
    var tr =
      "<tr class='row'>" +
      "<td>" + item.name + "</td>" +
      "<td>￥" + item.price.toFixed(2) + "</td>" +
      "<td>" + item.unit + "</td>" +
      "<td><input type='text' class='form-control text-center' data-barcode='" + item.barcode +
      "' name='itemCount' value='" + cartRecord.count + "'/></td>" +
      "<td><input type='button' class='btn btn-danger btn-xs' data-barcode='" + item.barcode +
      "' name='deleteBtn' value='删除'/></td>"
      "</tr>";

    $("#tableView").append(tr);
  });
  setBtnAction();
}

function setupTotalPrice() {
  Storage.getCartRecords(function(cartRecords) {
    var allItems = Storage.getLocalAllItems();
    var total = 0;
    cartRecords.forEach(function(cartRecord) {
      var item = getItem(cartRecord.barcode, allItems);
      total += item.price * cartRecord.count;
    })
    $('#total').html('总结：￥' + total);
  });
}

function setBtnAction() {
  setLogoBtnAction();
  setReceiptBtnAction();
  setItemCountAction();
  setDeleteBtnAction();
  setCheckOutBtnAction();
}

function setLogoBtnAction() {
  $('#logoBtn').click(function() {
    window.location.href = '../';
  });
}

function setReceiptBtnAction() {
  $('#receiptBtn').click(function() {
    window.location.href = 'receipt-list';
  });
}

function setItemCountAction() {
  $('input[name="itemCount"]').change(function() {
    var count = $(this).val();
    if (count === '') {
      count = '0';
      $(this).val('0');
    }
    
    var barcode = $(this).data('barcode');
    var cartRecord = { barcode: barcode, count: parseFloat(count) };
    Storage.setCartRecord(cartRecord, function() {
      setupCartCount();
      setupTotalPrice();
    });
  });
}

function setDeleteBtnAction() {
  $('input[name="deleteBtn"]').click(function() {
    Storage.setCartRecord({ barcode: $(this).data('barcode'), count: 0 }, function() {
      setupCartCount();
      setupTotalPrice();
    });
    $(this).parents('tr').remove();
  });
}

function setCheckOutBtnAction() {
  $('#checkOutBtn').click(function() {
    Storage.getCartRecords(function(cartRecords) {
      if (cartRecords.length > 0) {
        var allItems = Storage.getLocalAllItems();
        var receipt = generateReceipt(cartRecords, allItems);
        Storage.setCurrentReceipt(receipt);
        Storage.storeInList(receipt, function() {
          Storage.clearCart(function() {
            window.location.href = 'receipt';
          });
        });
      } else {
        alert("购物车为空！")
      }
    }); 
  });
}