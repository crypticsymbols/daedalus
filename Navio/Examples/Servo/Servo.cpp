#define MOTOR_1 3
#define MOTOR_2 4
#define MOTOR_3 5
#define MOTOR_4 6

#include <Navio/gpio.h>
#include "Navio/PCA9685.h"
#include "Navio/Util.h"

using namespace Navio;

extern "C" {

    void run(float ms)
    {
        static const uint8_t outputEnablePin = RPI_GPIO_27;

        Pin pin(outputEnablePin);

        if (pin.init()) {
            pin.setMode(Pin::GpioModeOutput);
            pin.write(0); /* drive Output Enable low */
        } else {
            fprintf(stderr, "Output Enable not set. Are you root?\n");
    //        return 1;
        }

        PCA9685 pwm;

        pwm.initialize();
        pwm.setFrequency(50);

            pwm.setPWMmS(MOTOR_1, ms);
            pwm.setPWMmS(MOTOR_2, ms);
            pwm.setPWMmS(MOTOR_3, ms);
            pwm.setPWMmS(MOTOR_4, ms);

    }

}
