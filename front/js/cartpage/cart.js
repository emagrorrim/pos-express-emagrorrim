$(document).ready(function() {
  loadCartPage();
});

function loadCartPage() {
  var allItems = getAllItems();
  var cartRecords = getCartRecords();
  displayItemsList(allItems, cartRecords);
  setBtnAction();
}

function setBtnAction() {
  setLogoBtnAction();
  setReceiptBtnAction();
  bindItemCountAction();
  bindDeleteBtnAction();
  bindCheckOutBtnAction();
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

function displayItemsList(allItems, cartRecords) {
  $('#cartCount').html(getTotalItemNumber());
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

function bindItemCountAction() {
  $('input[name="itemCount"]').change(function() {
    var count = $(this).val();
    if (count === '') {
      count = '0';
      $(this).val('0');
    }
    var barcode = this.dataset.barcode;
    setCartRecord({ barcode: barcode, count: parseFloat(count) });
    var cartRecords = getCartRecords();
    $('#cartCount').html(cartRecords.length);
  });
}

function bindDeleteBtnAction() {
  $('input[name="deleteBtn"]').click(function() {
    setCartRecord({ barcode: this.dataset.barcode, count: 0 });

    $(this).parents('tr').remove();
    $('#cartCount').html(getTotalItemNumber());
  });
}

function bindCheckOutBtnAction() {
  $('#checkOutBtn').click(function() {
    var allItems = getAllItems();
    var cartRecords = getCartRecords("cartRecords");
    var receipt = generateReceipt(cartRecords, allItems);
    setCurrentReceipt(receipt);
    storeInList(receipt);
    clearCart();
    window.location.href = '../../html/receipt.html';
  });
}
