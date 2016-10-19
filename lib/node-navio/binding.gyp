{
  "targets": [
    {
      "target_name": "pwm",
      "sources": [ "Navio/Examples/Servo/Servo.cpp" ],
      # "sources": [ "Navio/Examples/Servo/Servo.cpp", "Navio/Navio/PCA9685.cpp", "Navio/Navio/I2Cdev.cpp", "Navio/Navio/gpio.cpp" ],
      "include_dirs": ['Navio'],
      # "libraries": ['-L./Navio']
    }
  ]
}
