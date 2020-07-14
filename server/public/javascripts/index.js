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