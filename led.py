from gpiozero import LED

led = LED(17)

if sys.argv[1] == "ON": led.on()
if sys.argv[1] == "OFF": led.off()