#include "pwm.h"

using namespace v8;

Persistent<Function> PWM::constructor;

PWM::PWM(double value) : value_(value) {
  PCA9685 pwm;
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
  NODE_SET_PROTOTYPE_METHOD(tpl, "plusOne", PlusOne);

  constructor.Reset(isolate, tpl->GetFunction());
  exports->Set(String::NewFromUtf8(isolate, "PWM"),
               tpl->GetFunction());
}

void PWM::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  if (args.IsConstructCall()) {
    // Invoked as constructor: `new PWM(...)`
    double value = args[0]->IsUndefined() ? 0 : args[0]->NumberValue();
    PWM* obj = new PWM(value);
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    // Invoked as plain function `PWM(...)`, turn into construct call.
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    args.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

void PWM::GetValue(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);
  PWM* obj = ObjectWrap::Unwrap<PWM>(args.Holder());
  args.GetReturnValue().Set(Number::New(isolate, obj->value_));
}

void PWM::PlusOne(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  PWM* obj = ObjectWrap::Unwrap<PWM>(args.Holder());
  obj->value_ += 1;

  args.GetReturnValue().Set(Number::New(isolate, obj->value_));
}

void PWM::Multiply(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  PWM* obj = ObjectWrap::Unwrap<PWM>(args.Holder());
  double multiple = args[0]->IsUndefined() ? 1 : args[0]->NumberValue();

  const int argc = 1;
  Local<Value> argv[argc] = { Number::New(isolate, obj->value_ * multiple) };

  Local<Function> cons = Local<Function>::New(isolate, constructor);
  args.GetReturnValue().Set(cons->NewInstance(argc, argv));
}
