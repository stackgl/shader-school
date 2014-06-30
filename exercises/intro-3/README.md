# Control flow, user defined data types and macros


## Exercise

Implement a function which tests whether a point is inside the Mandelbrot set after 100 iterations.  The Mandelbrot set is a fractal, which is defined by iterating a chaotic map on the complex plane and testing which points converge.  Given an input point `c`, one iteration of the Mandelbrot function is defined as follows:

```glsl
vec2 mandelbrot(vec2 z, vec2 c) {
  return vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
}
```

And some iterations of the map are given as follows:

```glsl
vec2 z0 = vec2(0.0,0.0);        //No iterations
vec2 z1 = mandelbrot(z0, c);    // 1 iteration
vec2 z2 = mandelbrot(z1, c);    // 2 iterations

// ... and so on ...

vec2 zn = mandelbrot(zn_1, c);  // n iterations
```

As a general principle, say that a point in the Mandelbrot set diverges if it has a magnitude greater than 2:

```glsl
bool mandelbrotDiverges(vec2 z) {
  return length(z) >= 2.0;
}
```

The Mandelbrot set is the collection of all points which do not diverge. Write a function which given a test point `c` tests if after 100 iterations it is still inside the Mandelbrot set.  To get started, a <a href="/open/intro-3">file `mandelbrot.glsl` has been created in this project's directory.</a>

***

In this lesson, we will finish up our discussion of the basic GLSL programming language, covering control flow statements, user defined data types and the preprocessor.

## If statements

The most basic control flow statement in GLSL are `if` statements.  `if` statements in GLSL are semantically and syntactically the same as in JavaScript.  For example, here is how one could write a short if block in a shader:

```glsl
if(x > 0.0) {
  //Executed if x > 0
} else if(x < 0.0) {
  //Executed if x < 0
} else {
  //Executed if x == 0
}
```

## Loops

GLSL also supports looping, but with the one catch that the number of times the loop executes must be statically determined and bounded.  For example, GLSL supports `for` loops just like JavaScript:

```glsl
float x = 0.0;
for(int i=0; i<100; ++i) {
  x += i;   //Executes 100 times
}
```

It is also possible to write `while` loops, again with the restriction that the loop must terminate.

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
