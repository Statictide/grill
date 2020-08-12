const mqtt = require('mqtt')
const topic_root = "dk.daniakollegiet.sierra"

// Create a client instance
const broker = "test.mosquitto.org"
const client = mqtt.connect("http://broker.hivemq.com");

client.on('connect', () => {
    console.log("mqtt onConnect");

    client.subscribe(topic_root + "/#", (err) => {
        if (!err) {
            client.publish(topic_root, 'Hello mqtt')
        }
    })
})

client.on('message', (topic, message) => {
    console.log(topic.toString() + ": " + message.toString())
})


//TODO: connection lost
client.on('close', () => {
    console.log('mqtt disconnected')
})

