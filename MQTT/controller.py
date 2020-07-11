import paho.mqtt.client as mqtt
import time

broker = "broker.hivemq.com"
topic = "dk.daniakollegiet.markgrill"


client = mqtt.Client("controller")
client.connect(broker)
client.loop_start()

client.publish(topic, "ON")

#time.sleep(4)
client.loop_stop()
