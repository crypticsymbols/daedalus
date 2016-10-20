{
  "targets": [
    {
      "target_name": "pwm",
      "sources": [ "src/pwm/pwm_wrapper.cc", "src/pwm/pwm.cc" ],
      "dependencies" : ['libnavio'],
      'include_dirs': [
        'src/Navio',
      ],
      'link_settings': {
        'libraries': [
          '-Wl,-rpath,./build/Release'
        ]
      }
    },
    {
      "target_name": "libnavio",
      'type': 'shared_library',
      "sources": ["src/Navio/MPU9250.cpp", "src/Navio/MB85RC04.cpp", "src/Navio/gpio.cpp", "src/Navio/ADS1115.cpp", "src/Navio/MS5611.cpp", "src/Navio/Ublox.cpp", "src/Navio/MB85RC256.cpp", "src/Navio/I2Cdev.cpp", "src/Navio/PCA9685.cpp", "src/Navio/Util.cpp"]
    }
  ]
}