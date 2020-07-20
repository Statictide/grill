// Create a client instance
client = new Paho.MQTT.Client("broker.hivemq.com", Number("8000"), "web");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});

topic_root = "dk.daniakollegiet.markgrill"
// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe(topic_root + "/#");
  publish(topic_root, "Hello");
}

function publish(topicStr, payloadStr){
  message = new Paho.MQTT.Message(payloadStr);
  message.destinationName = topicStr;
  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log(message.destinationName + ":" + message.payloadString);
}




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
