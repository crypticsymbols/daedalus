{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "addon.cc", "myobject.cc", "../Navio/Examples/cat.cpp" ],
      "dependencies" : ['pwm'],
      'link_settings': {
        'libraries': [
          '-Wl,-rpath,/path/to/libraries'
        ]
      }
      # "include_dirs": [ "../Navio/Examples" ]
      # "xcode_settings": {
      #   "OTHER_CFLAGS": ["-stdlib=libc++"],
      #   'MACOSX_DEPLOYMENT_TARGET': '10.9'
      # }
    },
    {
      "target_name": "pwm",
      'type': 'shared_library',
      "sources": ["../Navio/Navio/MPU9250.cpp", "../Navio/Navio/MB85RC04.cpp", "../Navio/Navio/gpio.cpp", "../Navio/Navio/ADS1115.cpp", "../Navio/Navio/MS5611.cpp", "../Navio/Navio/Ublox.cpp", "../Navio/Navio/MB85RC256.cpp", "../Navio/Navio/I2Cdev.cpp", "../Navio/Navio/PCA9685.cpp", "../Navio/Navio/Util.cpp"]
    }
  ]
}
