from gpiozero import LED
import time

led = LED(17)

pulse_with: int = 4

while True:
    print("ON")
    led.on()
    time.sleep(pulse_with)

    print("OFF")
    led.off()
    time.sleep(pulse_with)
