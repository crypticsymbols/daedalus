#include <node.h>
#include "myobject.h"
// #include "../Navio/Examples/cat.cpp"

using namespace v8;

void InitAll(Handle<Object> exports) {
  MyObject::Init(exports);
}

NODE_MODULE(addon, InitAll)
