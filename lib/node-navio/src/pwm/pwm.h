#ifndef PWM_H
#define PWM_H

#include <node.h>
#include <node_object_wrap.h>

#include <PCA9685.h>

class PWM : public node::ObjectWrap {
 public:
  static void Init(v8::Handle<v8::Object> exports);

 private:
  explicit PWM(double value = 0);
  ~PWM();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void GetValue(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void PlusOne(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void Multiply(const v8::FunctionCallbackInfo<v8::Value>& args);
  static v8::Persistent<v8::Function> constructor;
  double value_;
};

#endif
