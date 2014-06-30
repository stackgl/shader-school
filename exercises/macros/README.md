## Preprocessor

GLSL also has a C-like preprocessor.  All preprocessor commands are prefixed with a `#` symbol and are executed at compile time.

### Macros

One of the most useful preprocessor features are macros. Macros are like functions, but they are expanded at compile time. This makes them useful for generating code or complex functions in shaders that would be too cumbersome to write by hand. Macros are also useful for defining constant values in shaders and for conditional compilation. To declare a macro, you can use the `#define` command.  For example, here is a simple use of macros:

```glsl
#define MAX_LIGHTS 10

vec3 lightPositions[MAX_LIGHTS];
```

When compiled, this code will expand into:

```glsl
vec3 lightPositions[10];
```

Macros can also take parameters, for example:

```glsl
#define PLUS_ONE(x)  (x+1.0)

float y = 0.0;
float z = PLUS_ONE(y);
```

Which expands to:

```glsl
float y = 0.0;
float z = (y+1.0);
```

### Conditional compilation

The GLSL preprocessor also supports basic logic for conditional compilation using the `#if`, `#else` and `#endif` commands:

```glsl
#define USE_FAST_RANDOM  1


#if USE_FAST_RANDOM

float random(float seed) {
  return 2.0;  //Rolled using a fair die
}

#else

float random(float seed) {
  // ...
}

#endif
```

### Capabilities

Conditional compilation is especially helpful when combined with knowledge of device capabilities. For example, if a WebGL implementation does not support some extension then the shader can detect this with an appropriate preprocessor command and select some fallback.
