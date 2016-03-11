$(document).ready(function() {
  setupUI();
});

function setupUI() {
  setupHtml();
  setBtnAction();
}

function setupHtml() {
  setCartCount();    
  var receiptlist = getReceiptList();
  setReceiptList(receiptlist);
}


function setReceiptList(receiptlist) {
 
  receiptlist.forEach(function(receipt) {
    var date = receipt.date;

    var tr =
      "<tr class='row'>" +
      "<td>" + date + "</td>" +
      "<td>￥" +  receipt.total.toFixed(2) + "</td>" +
      "<td><button type='text' class='btn btn-lg btn-danger btn-xs' data-date='" + date +
      "' name='detailBtn'><span class='glyphicon glyphicon-align-justify'></span></button></td>" +
      "</tr>";

    $("#tableView").append(tr);
  })
}

function setCartCount() {
  var cartRecords = getCartRecords();
  $('#cartCount').html(getTotalItemNumber());
}

function findCurrentReceipt(date) {
  var receiptlist = getReceiptList();
  for (var i = 0; i < receiptlist.length; i++) {
    if (receiptlist[i].date === date) {
      return receiptlist[i];
    }
  }
}

function setBtnAction() {
  setCartBtnAction();
  setLogoBtnAction();
  bindTapAction();
}

function setCartBtnAction() {
  $('#cartBtn').click(function() {
    window.location.href = 'cart.html';
  });
}

function setLogoBtnAction() {
  $('#logoBtn').click(function() {
    window.location.href = '../index.html';
  });
}

function bindTapAction() {
  $('button[name="detailBtn"]').click(function() {
    var date = this.dataset.date;
    var receipt = findCurrentReceipt(date);
    setCurrentReceipt(receipt);
    window.location.href='receipt.html';
  });
}