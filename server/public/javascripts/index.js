var stripe = Stripe('pk_test_51H4hdCKXVCnO2pJVsgZiUI6FRFLuypE6LfiNdOKPMNqdnScPRFGYgNBXpX71792TcgPQdby3VVHeQ65od6mKiTQ100ctrEddPA');

var response = fetch('/id')
  .then(function(response) {
    return response.json();
  })
  .then(function(responseJson) {
  var sessionID = responseJson.session_id;
  // Call stripe.redirectToCheckout() with the Session ID.

  var checkoutButton = document.getElementById('checkout-button');

  checkoutButton.addEventListener('click', function() {
    stripe.redirectToCheckout({sessionId: sessionID})
      .then(function (result) { /* Display error on network failure */ });
  });
});