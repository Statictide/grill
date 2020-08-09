var stripe = Stripe('pk_test_51H4hdCKXVCnO2pJVsgZiUI6FRFLuypE6LfiNdOKPMNqdnScPRFGYgNBXpX71792TcgPQdby3VVHeQ65od6mKiTQ100ctrEddPA');


window.onload = function() {
    var checkoutButton = document.getElementById('checkout-button');

    checkoutButton.addEventListener('click', function() {
        fetch('/id')
        .then(response => response.json())
        .then(responseJson => stripe.redirectToCheckout({sessionId: responseJson.session_id}))
        .then(result => { /* Display error on network failure */ })
        .catch(err => alert(err.message))
    });
};
