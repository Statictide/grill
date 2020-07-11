import paho.mqtt.client as mqtt
from gpiozero import LED
from time import sleep

#LED
led = LED(17)

#MQTT
broker = "broker.hivemq.com"
topic = "dk.daniakollegiet.markgrill"

client = mqtt.Client("pi")
client.connect(broker)
client.loop_start()

def on_message(client, userdata, message):
    payload = message.payload.decode("utf-8")
    print(f"message recieverd on {message.topic} with message {payload}")
    if payload == "ON": led.on()
    if payload == "OFF": led.off()

client.on_message = on_message
client.subscribe(topic)

while True:
    pass