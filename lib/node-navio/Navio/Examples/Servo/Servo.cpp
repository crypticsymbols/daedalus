#include "pwm.h"

namespace demo {

using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Persistent;
using v8::String;
using v8::Value;

Persistent<Function> PWMController::constructor;

PWMController::PWMController() {
}

PWMController::~PWMController() {
}

void PWMController::Init(Local<Object> exports) {
  Isolate* isolate = exports->GetIsolate();

  // Prepare constructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "PWMController"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Prototype
  NODE_SET_PROTOTYPE_METHOD(tpl, "setPWM", setPWM);

  constructor.Reset(isolate, tpl->GetFunction());
  exports->Set(String::NewFromUtf8(isolate, "PWMController"),
               tpl->GetFunction());
}

void PWMController::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (args.IsConstructCall()) {
    // Invoked as constructor: `new PWMController(...)`
    // double value = args[0]->IsUndefined() ? 0 : args[0]->NumberValue();
    // PWMController* obj = new PWMController(value);
    PWMController* obj = new PWMController();
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    // Invoked as plain function `PWMController(...)`, turn into construct call.
    // const int argc = 1;
    // Local<Value> argv[argc] = { args[0] };
    Local<Context> context = isolate->GetCurrentContext();
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    // Local<Object> result = cons->NewInstance(context, argc, argv).ToLocalChecked();
    Local<Object> result = cons->NewInstance(context).ToLocalChecked();
    args.GetReturnValue().Set(result);
  }
}

void PWMController::setPWM(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  PWMController* obj = ObjectWrap::Unwrap<PWMController>(args.Holder());
  obj->pwm += 1;

  args.GetReturnValue().Set(Number::New(isolate, obj->pwm));
}

}  // namespace demo

namespace demo {

using v8::Local;
using v8::Object;

void InitAll(Local<Object> exports) {
  PWMController::Init(exports);
}

NODE_MODULE(addon, InitAll)

}  // namespace demo

// #define MOTOR_1 3
// #define MOTOR_2 4
// #define MOTOR_3 5
// #define MOTOR_4 6
// #define FREQUENCY 300

// #include <Navio/gpio.h>
// #include "Navio/PCA9685.h"
// #include "Navio/Util.h"

// using namespace Navio;

// class Control {
// public:
//     Control() {
//         static const uint8_t outputEnablePin = RPI_GPIO_27;
//         Pin pin(outputEnablePin);
//         if (pin.init()) {
//             pin.setMode(Pin::GpioModeOutput);
//             pin.write(0); /* drive Output Enable low */
//         } else {
//             fprintf(stderr, "Output Enable not set. Are you root?\n");
//         }

//         PCA9685 pwm;
//         pwm.initialize();
//         pwm.setFrequency(FREQUENCY);
//         this->pwm = pwm;
//     }
//     void set(float ms_1, float ms_2, float ms_3, float ms_4)
//     {
//         pwm.setPWMmS(MOTOR_1, ms_1);
//         pwm.setPWMmS(MOTOR_2, ms_2);
//         pwm.setPWMmS(MOTOR_3, ms_3);
//         pwm.setPWMmS(MOTOR_4, ms_4);
//     }
// private:
//     PCA9685 pwm;
// };

// // Control::

// extern "C" Control* setup() {
//     return new Control;
// }

// extern "C" void set(float ms_1, float ms_2, float ms_3, float ms_4) {
//     return new Control;
// }

