/* Echoes data comming over software serial port to the primary serial interface.

Software UART pins:
RX: 2
TX: 3

IC 74HC4050E is used to convert 5V levels (Arduino) to 3.3 (Raspberry)

Thanks to Andre Miller's article
http://www.andremiller.net/content/raspberry-pi-and-arduino-via-gpio-uart#comment-1144

*/

unsigned char rxPin = 2;
unsigned char txPin = 3;

#include <SoftwareSerial.h>

SoftwareSerial serialUart(rxPin, txPin); 

void setup()  
{
  // Main serial is used to transfer data to PC.
  Serial.begin(57600);
 
  // Raspberry Pi is connected at 9600 baud
  serialUart.begin(9600);
  
  Serial.println("Serial Echo is ready");
}

void loop() // run over and over
{
  int byteCount;
  // Raspberry -> Arduino
  if (byteCount = serialUart.available())
  {
    while (byteCount--)
    {
      unsigned char data = serialUart.read();
      Serial.write(data);
    }
  }
  
  // Arduino -> Raspberry
  if (byteCount = Serial.available())
  {
    while (byteCount--)
    {
      unsigned char data = Serial.read();
      serialUart.write(data);
    }
  }
}
