#include <Servo.h> 
 
Servo servoX;
Servo servoY;
 
void setup() 
{ 
  servoY.attach(8);  
  servoX.attach(9);  
} 
 
void loop() 
{ 
  servoX.write(90);
  servoY.write(90);
  
  delay(2000);
  
  servoX.write(45);
  delay(1500);
  servoX.write(135);
  delay(1500);
  servoX.write(90);
  delay(500);
  
  servoY.write(60);
  delay(800);
  servoY.write(120);
  delay(800);
  servoY.write(90);

 
//  servoX.write(45);
//  servoY.write(45);
  
} 
