#include "../../Navio/PCA9685.h"
// #######################
#ifndef PWMCONTROLLER_H
#define PWMCONTROLLER_H
#include <node.h>
#include <node_object_wrap.h>

namespace demo {

class PWMController : public node::ObjectWrap {
 public:
  static void Init(v8::Local<v8::Object> exports);

 private:
  explicit PWMController();
  ~PWMController();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void setPWM(const v8::FunctionCallbackInfo<v8::Value>& args);
  static v8::Persistent<v8::Function> constructor;
  PCA9685 pwm;
};

}  // namespace demo

#endif

// document 2 years api
// 2 years frontend 
// 2 years with RoR or angular
// 
// 