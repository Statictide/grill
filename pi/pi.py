import paho.mqtt.client as mqtt
from gpiozero import LED
from time import sleep

#LED
led2 = LED(2)

#MQTT
broker = "broker.hivemq.com"
topic_root = "dk.daniakollegiet.markgrill"
topic_pi = topic_root + "/pi"
topic_leds = topic_pi + "/led/+"

client = mqtt.Client("pi")
client.connect(broker)

def on_message(client, userdata, message):
    topicStr = message.topic
    payloadStr = message.payload.decode("utf-8")
    print(f"{topicStr}: {payloadStr}")

    pin = int(topicStr.split("/")[-1])

    if pin == 2 and payloadStr == "TOGGLE": 
        led2.toggle()

def on_connect(client, userdata, flags, rc):
    print("Connected")
    client.subscribe(topic_leds)

def on_disconnect(client, userdata, rc):
    print("Disconnected")


client.on_message = on_message
client.on_connect = on_connect
client.on_disconnect = on_disconnect


client.loop_forever()