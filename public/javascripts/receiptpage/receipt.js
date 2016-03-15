$(document).ready(function() {
  setupUI();
});

function setupUI() {
  setupCartCount();
  setupList();
  setBtnAction();
}

function setupList() {
  setReceipt(Storage.getCurrentReceipt());
}

function setupCartCount() {
  Storage.getCartCount(setCartCount);
}

function setCartCount(total) {
  $('#cartCount').html(total);
}

function setReceipt(receipt) {
  setTotalPrice(receipt.total);

  var receiptItems = receipt.receiptItems;
  receiptItems.forEach(function(receiptItem) {
    var tr =
      "<tr class='row'>" +
      "<td>" + receiptItem.cartItem.item.name + "</td>" +
      "<td>￥" + parseFloat(receiptItem.cartItem.item.price).toFixed(2) + "</td>" +
      "<td>" + receiptItem.cartItem.item.unit + "</td>" +
      "<td>" + receiptItem.cartItem.count + "</td>" +
      "<td>" + parseFloat(receiptItem.total).toFixed(2) + "</td>" +
      "</tr>";

    $("#tableView").append(tr);
  });
  setBackBtnAction();
}

function setTotalPrice(total) {
  var totalPrice = '￥' + parseFloat(total).toFixed(2);
  $('#totalPrice').html(totalPrice);
}

function setBtnAction() {
  setCartBtnAction();
  setLogoBtnAction();
  setReceiptBtnAction();
}

function setCartBtnAction() {
  $('#cartBtn').click(function() {
    window.location.href = '../cart';
  });
}

function setLogoBtnAction() {
  $('#logoBtn').click(function() {
    window.location.href = '../';
  });
}

function setReceiptBtnAction() {
  $('#receiptBtn').click(function() {
    window.location.href = '../receipt-list';
  });
}

function setBackBtnAction() {
  $('#backHomeBtn').click(function() {
    window.location.href = "../";
  });
}
