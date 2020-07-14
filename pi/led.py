from gpiozero import LED
import sys

if(len(sys.argv)) <= 1: exit()  #At least 1 argument
gpio_pin : int = int(sys.argv[1])

led = LED(gpio_pin).on()

while True: pass