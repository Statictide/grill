from gpiozero import LED
import sys

if(len(sys.argv)) <= 2: exit()
gpio_pin : int = int(sys.argv[1])
action : str = sys.argv[2]

led = LED(gpio_pin)

if action == "ON": 
    led.on()
    print(f"LED {gpio_pin} ON")
else:
    led.off()
    print(f"LED {gpio_pin} OFF")