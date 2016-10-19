#ifndef PWMCONTROLLER_H
#define PWMCONTROLLER_H

#include <node.h>
#include <node_object_wrap.h>

#include <Navio/gpio.h>
#include "Navio/PCA9685.h"
#include "Navio/Util.h"

// namespace Navio {

class PWMController : public node::ObjectWrap {
 public:
  static void Init(v8::Local<v8::Object> exports);

 private:
  explicit PWMController();
  ~PWMController();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void setPWM(const v8::FunctionCallbackInfo<v8::Value>& args);
  static v8::Persistent<v8::Function> constructor;
  double value_;
  PCA9685 pwm;
};

// }  // namespace Navio

#endif