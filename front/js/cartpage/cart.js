$(document).ready(function() {
  setupUI();
});

function setupUI() {
  setupHtml();
  setBtnAction();
}

function setupHtml() {
  setCartCount();
  var allItems = Storage.getAllItems();
  var cartRecords = Storage.getCartRecords();
  setItemsList(allItems, cartRecords);
}

function setCartCount() {
  $('#cartCount').html(getTotalItemNumber());
}

function setItemsList(allItems, cartRecords) {
  
  var total = 0;
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
    setCartRecord({ barcode: barcode, count: parseFloat(count) });
    $('#cartCount').html(Storage.getTotalItemNumber());
  });
}

function setDeleteBtnAction() {
  $('input[name="deleteBtn"]').click(function() {
    setCartRecord({ barcode: $(this).data('barcode'), count: 0 });

    $(this).parents('tr').remove();
    $('#cartCount').html(getTotalItemNumber());
    $('#total').html("总计：￥"+0);
  });
}

function setCheckOutBtnAction() {
  $('#checkOutBtn').click(function() {
    var cartRecords = getCartRecords("cartRecords");
    if (cartRecords.length > 0) {
      var allItems = getAllItems();
      var receipt = generateReceipt(cartRecords, allItems);
      setCurrentReceipt(receipt);
      storeInList(receipt);
      clearCart();
      window.location.href = 'receipt.html';
    } else {
        alert("购物车为空！")
    }  
  });
}
