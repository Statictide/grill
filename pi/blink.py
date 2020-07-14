from gpiozero import LED
import time

led = LED(17)

while True:
    print("ON")
    led.on()
    time.sleep(1)

    print("OFF")
    led.off()
    time.sleep(1)
