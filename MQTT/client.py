import paho.mqtt.client as mqtt
import time
import sys

broker = "broker.hivemq.com"
topic = "dk.daniakollegiet.markgrill"



client = mqtt.Client()
client.connect(broker)
print("MQTT connected")
client.loop_start()

client.on_message = on_message
client.subscribe(topic)

led_is_on = true
def on_message(client, userdata, message):
    print(f"{message.topic}: {message.payload}")
    if(message.payload.decode(utf-8) == "toggle"){
        led_is_on != led_is_on
        print(f"led is {"on" if led_is_on else "OFF"}")

    }



while True:
    pass
#time.sleep(10)
#client.loop_stop()
#print("MQTT loop stoped")