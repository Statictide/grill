from gpiozero import LED
import sys
import time

gpio_pin : int = int(sys.argv[1])

led = LED(2)
led.on()


time.sleep(4)