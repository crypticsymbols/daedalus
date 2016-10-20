#include <node.h>
#include "pwm.h"

using namespace v8;

void InitAll(Handle<Object> exports) {
  PWM::Init(exports);
}

NODE_MODULE(pwm, InitAll)
