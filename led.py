from gpiozero import LED
import sys

led = LED(21)

if sys.argv[1] == "ON": 
    led.on()
    print("LED ON")
if sys.argv[1] == "OFF": 
    led.off()
    print("LED OFF")