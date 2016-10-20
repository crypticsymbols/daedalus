// #####################
// Placeholder for prototype
#define MOTOR_1 3
#define MOTOR_2 4
#define MOTOR_3 5
#define MOTOR_4 6
#define FREQUENCY 300
// ######################

#include "pwm.h"

using namespace v8;

Persistent<Function> PWM::constructor;

PWM::PWM() {
  static const uint8_t outputEnablePin = RPI_GPIO_27;
  Pin pin(outputEnablePin);
  if (pin.init()) {
      pin.setMode(Pin::GpioModeOutput);
      pin.write(0); /* drive Output Enable low */
  } else {
      fprintf(stderr, "Output Enable not set. Are you root?\n");
  }

  PCA9685 pwm;
  pwm.initialize();
  pwm.setFrequency(FREQUENCY);
  this->pwm = pwm;
}

PWM::~PWM() {
}

void PWM::Init(Handle<Object> exports) {
  Isolate* isolate = Isolate::GetCurrent();

  // Prepare constructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "PWM"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Prototype
  NODE_SET_PROTOTYPE_METHOD(tpl, "setPWM", setPWM);

  constructor.Reset(isolate, tpl->GetFunction());
  exports->Set(String::NewFromUtf8(isolate, "PWM"),
               tpl->GetFunction());
}

void PWM::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  if (args.IsConstructCall()) {
    // Invoked as constructor: `new PWM(...)`
    // double value = args[0]->IsUndefined() ? 0 : args[0]->NumberValue();
    PWM* obj = new PWM();
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    // Invoked as plain function `PWM(...)`, turn into construct call.
    // const int argc = 1;
    // Local<Value> argv[argc] = { args[0] };
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    args.GetReturnValue().Set(cons->NewInstance());
  }
}

// void PWM::GetValue(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = Isolate::GetCurrent();
//   HandleScope scope(isolate);
//   PWM* obj = ObjectWrap::Unwrap<PWM>(args.Holder());
//   args.GetReturnValue().Set(Number::New(isolate, obj->value_));
// }

void PWM::setPWM(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);
  PWM* obj = ObjectWrap::Unwrap<PWM>(args.Holder());

  float ms_1 = args[0]->FloatValue();
  float ms_2 = args[1]->FloatValue();
  float ms_3 = args[2]->FloatValue();
  float ms_4 = args[3]->FloatValue();

  printf('values %4.2F ## %4.2F ## %4.2F ## %4.2F', ms_1, ms_2, ms_3, ms_4);

  pwm.setPWMmS(MOTOR_1, ms_1);
  pwm.setPWMmS(MOTOR_2, ms_2);
  pwm.setPWMmS(MOTOR_3, ms_3);
  pwm.setPWMmS(MOTOR_4, ms_4);

  args.GetReturnValue().Set(Number::New(isolate, obj->value_));
}

// void PWM::Multiply(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = Isolate::GetCurrent();
//   HandleScope scope(isolate);

//   PWM* obj = ObjectWrap::Unwrap<PWM>(args.Holder());
//   double multiple = args[0]->IsUndefined() ? 1 : args[0]->NumberValue();

//   const int argc = 1;
//   Local<Value> argv[argc] = { Number::New(isolate, obj->value_ * multiple) };

//   Local<Function> cons = Local<Function>::New(isolate, constructor);
//   args.GetReturnValue().Set(cons->NewInstance(argc, argv));
// }
