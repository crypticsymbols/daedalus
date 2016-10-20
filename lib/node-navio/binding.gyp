{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "addon.cc", "myobject.cc", "src/Navio/Examples/cat.cpp" ],
      "dependencies" : ['pwm'],
      'link_settings': {
        'libraries': [
          '-Wl,-rpath,./build/Release'
        ]
      }
    },
    {
      "target_name": "pwm",
      'type': 'shared_library',
      "sources": ["src/Navio/Navio/MPU9250.cpp", "src/Navio/Navio/MB85RC04.cpp", "src/Navio/Navio/gpio.cpp", "src/Navio/Navio/ADS1115.cpp", "src/Navio/Navio/MS5611.cpp", "src/Navio/Navio/Ublox.cpp", "src/Navio/Navio/MB85RC256.cpp", "src/Navio/Navio/I2Cdev.cpp", "src/Navio/Navio/PCA9685.cpp", "src/Navio/Navio/Util.cpp"]
    }
  ]
}
