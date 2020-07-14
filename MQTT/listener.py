import paho.mqtt.client as mqtt

#MQTT
broker = "broker.hivemq.com"
topic = "dk.daniakollegiet.markgrill"

client = mqtt.Client("listener")
client.connect(broker)
print("MQTT connected")
client.loop_start()

def on_message(client, userdata, message):
    payload = message.payload.decode("utf-8")
    print(f"message recieverd on {message.topic} with message {payload}")

client.on_message = on_message
client.subscribe(topic)

while True:
    pass