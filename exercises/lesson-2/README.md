# Control flow, user defined data types and macros

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

## Compound datatypes and arrays

While GLSL is not an object oriented programming language, it does support user defined data structures.  These are declared using the `struct` keyword.  For example, here is how you might declare a data structure for a point light source:

```glsl
//Declare a datatype for a point light
struct PointLight {
  vec3 position;
  vec3 color;
  float cutoff;
};

//Declare a single point light called light
PointLight light;

//Set the color of the light to red (1,0,0)
light.color = vec3(1, 0, 0);
```

GLSL also supports arrays, using the same syntax as C.  Just like JavaScript array indexes start from `0`, though unlike in JavaScript their size must be declared in advance. For example, here is how to declare an array of 10 point lights in GLSL:

```glsl
//Declare an array of 10 point lights called "lights"
PointLight lights[10];

//Modify the first light in the array
lights[0].radius = 100.0;
```

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

## Exercise

To apply what we've learned about control flow, in this lesson we are going to render the mandelbrot set in GLSL. Given any complex number `c`, define the sequence of `z(n)` to be:

```
z(0)   = 0.0
z(n+1) = z(n) * z(n) + c
```

Then we say that the point `c` is in the mandelbrot set if this sequence converges

```
    lim          z(n)   < infinity
n -> infinity
```

Since we can't calculate z(infinity) directly, we will instead make do with a finite approximation.  Here you should write a shader program which computes `z(100)` and tests if the magnitude of `z` is less than 2.  You should implement a function which fits the following interface:

```glsl
//Test if the point c is within the mandelbrot set after 100 iterations
// c.x is the real part of c
// c.y is the imaginary part of c
bool mandelbrot(vec2 c) {
  
  //TODO: Return true if z(100) < 2

  return false;
}
```

### Hints

Remember the definition of complex multiplication:

```
(a + b*i) * (c + d*i) = (a * c - b * d) + (a * d + b * d) * i