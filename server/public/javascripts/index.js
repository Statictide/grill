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

function openGrillBox(grill_name) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("demo").innerHTML = this.responseText;
            console.log(this.responseText);
        }
    };

    let json = JSON.stringify({
        open: true,
    });
    
    xhttp.open("PUT", "http://localhost:3000/grills/" + grill_name, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(json);
}

function releaseGrill(grill_name) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("demo").innerHTML = this.responseText;
            console.log(this.responseText);
        }
    };

    let json = JSON.stringify({
        release: true,
    });
    
    xhttp.open("PUT", "http://localhost:3000/grills/" + grill_name, true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(json);
}