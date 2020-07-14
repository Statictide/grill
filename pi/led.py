from gpiozero import LED
import sys
import time

if(len(sys.argv)) <= 1: exit()  #At least 1 argument
gpio_pin : int = int(sys.argv[1])

led = LED(gpio_pin)
led.on()

time.sleep(4)

led = LED(18)
led.on()

time.sleep(4)