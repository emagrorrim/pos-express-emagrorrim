$(document).ready(function() {
  setupUI();
});

function setupUI() {
  setupCartCount();
  setupList();
  setBtnAction();
}

function setupCartCount() {
  Storage.getCartCount(setCartCount);
}

function setupList() {
  Storage.getAllItems(setItemsList);
}

function setCartCount(count) {
  $('#cartCount').html(count);
}

function setItemsList(allItems) {
  allItems.forEach(function(item) {
    var tr ="<tr class='row'>" +
              "<td class='col-xs-3'>" + item.name + "</td>" +
              "<td class='col-xs-2'>￥" + item.price.toFixed(2) + "</td>" +
              "<td class='col-xs-4'>" + item.unit + "</td>" +
              "<td class='col-xs-1'><input type='button' class='btn btn-lg btn-danger btn-xs' data-barcode='" + item.barcode +
              "' name='itemCount' value='+'/></td>" +
              "<td class='col-xs-2'></td>" +
            "</tr>";

    $("#tableView").append(tr);
  });
}

function setBtnAction() {
  setCartBtnAction();
  setReceiptBtnAction();
  setAddBtnAction();
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

function setAddBtnAction() {
  $('input[name="itemCount"]').click(function() {
    var barcode = $(this).data('barcode');
    var cartRecord = { barcode: barcode, count: 1 };
    Storage.setCartRecord(cartRecord, setupCartCount);
  });
}
