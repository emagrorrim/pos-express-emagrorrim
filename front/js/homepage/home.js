$(document).ready(function() {
  setupUI();
});

function setupUI() {
  setupHtml();
  setBtnAction();
}

function setupHtml() {
  var allItems = Storage.getAllItems();
  var cartRecords = Storage.getCartRecords();
  setItemsList(allItems, cartRecords);
}

function setItemsList(allItems, cartRecords) {
  $('#cartCount').html(Storage.getTotalItemNumber());

  allItems.forEach(function(item) {
    var count = getPurchasedCount(item.barcode, cartRecords);

    var tr =
      "<tr class='row'>" +
      "<td class='col-xs-3'>" + item.name + "</td>" +
      "<td class='col-xs-2'>￥" + item.price.toFixed(2) + "</td>" +
      "<td class='col-xs-4'>" + item.unit + "</td>" +
      "<td class='col-xs-1'><input type='text' class='form-control text-center' data-barcode='" + item.barcode +
      "' name='itemCount' value='" + count + "'/></td>" +
      "<td class='col-xs-2'></td>" +
      "</tr>";

    $("#tableView").append(tr);
  });
}

function setBtnAction() {
  setCartBtnAction();
  setReceiptBtnAction();
  setTextFieldChanged();
}

function setCartBtnAction() {
  $('#cartBtn').click(function() {
    window.location.href = 'html/cart.html';
  });
}

function setReceiptBtnAction() {
  $('#receiptBtn').click(function() {
    window.location.href = 'html/receipt-list.html';
  });
}

function setTextFieldChanged() {
  $('input[name="itemCount"]').change(function() {
    var count = $(this).val();
    if (count === '') {
      count = '0';
      $(this).val('0');
    }
    var barcode = this.dataset.barcode;
    Storage.setCartRecord({ barcode: barcode, count: parseFloat(count) });
    $('#cartCount').html(Storage.getTotalItemNumber());
  });
}
