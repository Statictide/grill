import paho.mqtt.client as mqtt
from gpiozero import LED
from time import sleep

#LED
led = LED(17)

#MQTT
broker = "broker.hivemq.com"
topic_root = "dk.daniakollegiet.markgrill"
topic_pi = topic_root + "/pi"
topic_leds = topic_pi + "/led/+"

client = mqtt.Client("pi")
client.connect(broker)

def on_message(client, userdata, message):
    topic = message.topic.decode("utf-8")
    payload = message.payload.decode("utf-8")
    print(f"{message.topic}: {payload}")

    pin = int(topic.split("/")[-1])
    if payload == "TOGGLE": LED(pin).toggle()

def on_connect(client, userdata, flags, rc):
    print("Connected")
    client.subscribe(topic_leds)

def on_disconnect(client, userdata, rc):
    print("Disconnected")


client.on_message = on_message
client.on_connect = on_connect
client.on_disconnect = on_disconnect


client.loop_forever()