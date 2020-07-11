import paho.mqtt.client as mqtt
import time

broker = "test.mosquitto.org" 
broker = "broker.hivemq.com"
topic = "dk.daniakollegiet.markgrill"


def on_message(client, userdata, message):
    print(f"message recieverd on {message.topic} with message {message.payload}")
    if message.payload.decode("utf-8") == "ON": print("Light ON!")


client = mqtt.Client("pi")
client.connect(broker)
client.loop_start()

client.on_message = on_message
client.subscribe(topic)
client.publish(topic, "ON")

time.sleep(4)
client.loop_stop()
