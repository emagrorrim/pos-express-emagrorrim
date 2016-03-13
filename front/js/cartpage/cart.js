$(document).ready(function() {
  setupUI();
});

function setupUI() {
  setupCartCount();
  setupList();
  setBtnAction();
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
  
  var total = 0;
  var allItems = Storage.getLocalAllItems();
  cartRecords.forEach(function(cartRecord) {
      
    var item = getItem(cartRecord.barcode, allItems);
    total += item.price * cartRecord.count;
    $('#total').html("总计：￥"+total);
    
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
    window.location.href = '../index.html';
  });
}

function setReceiptBtnAction() {
  $('#receiptBtn').click(function() {
    window.location.href = 'receipt-list.html';
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
    Storage.setCartRecord(cartRecord, setupCartCount);
    setupCartCount();
  });
}

function setDeleteBtnAction() {
  $('input[name="deleteBtn"]').click(function() {
    Storage.setCartRecord({ barcode: $(this).data('barcode'), count: 0 }, setupCartCount);

    $(this).parents('tr').remove();
    $('#total').html("总计：￥"+0);
  });
}

function setCheckOutBtnAction() {
  $('#checkOutBtn').click(function() {
    Storage.getCartRecords(function(cartRecords) {
      if (cartRecords.length > 0) {
        var allItems = Storage.getLocalAllItems();
        var receipt = generateReceipt(cartRecords, allItems);
        Storage.setCurrentReceipt(receipt);
        Storage.storeInList(receipt);
        Storage.clearCart();
        window.location.href = 'receipt.html';
      } else {
        alert("购物车为空！")
      }
    }); 
  });
}
