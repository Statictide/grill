import paho.mqtt.client as mqtt
import time
import sys

broker = "test.mosquitto.org" 
broker = "broker.hivemq.com"
topic = "dk.daniakollegiet.markgrill"


def on_message(client, userdata, message):
    print(f"message recieverd on {message.topic} with message {message.payload}")

client = mqtt.Client()
print(client)
client.connect(broker)
client.loop_start()
print("MQTT loop started")

client.on_message = on_message
client.subscribe(topic)
client.publish(topic, "ON")
client.publish(topic, "OFF")

time.sleep(10)
client.loop_stop()
print("MQTT loop stoped")