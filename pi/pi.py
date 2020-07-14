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
    payload = message.payload.decode("utf-8")
    print(f"{message.topic}: {payload}")
    if payload == "TOGGLE": led.toggle()

client.on_message = on_message
client.subscribe(topic_leds)
print("Subscribed to topic: " + topic_leds)

client.loop_forever()