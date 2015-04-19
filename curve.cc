#include <node.h>
#include <v8.h>
#include <node_buffer.h>
#include "vendor/curve25519-donna.c"

using namespace v8;
using namespace node;


void DoCurve(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
        if (args.Length() < 2) {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "Usage: curve(a, b, c)")));
        return;
    }

    unsigned char* arg0 = (unsigned char*) Buffer::Data(args[0]->ToObject());
    unsigned char* arg1 = (unsigned char*) Buffer::Data(args[1]->ToObject());
    unsigned char* arg2 = (unsigned char*) Buffer::Data(args[2]->ToObject());

    curve25519_donna(arg0, arg1, arg2);
}

void Initialise(Handle<Object> exports) {
    NODE_SET_METHOD(exports, "curve", DoCurve);
}

NODE_MODULE(curve, Initialise)
