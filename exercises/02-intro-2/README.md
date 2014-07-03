# Qualifiers and built-ins

## Exercise

Write a function to compute the side lengths of a right triangle, given the angle for one of the sides and the length of the hypotenuse. To help you get started, a template file called `sides.glsl` has been created in <a href="/open/02-intro-2" target="_blank">the directory for this lesson</a>.

***

## Precision specifiers

Floating point variables are declared with an optional precision specifier that tells the GPU how many bits to use when representing a variable. The types are:

* `lowp` - Lowest precision supported on the available hardware
* `mediump` - Default precision supported on the hardware
* `highp` - Highest precision supported on the hardware

The number of bits available at the different precision levels can vary between implementations. To declare a floating point variable, you just write the precision specifier then `float`.  For example:

```glsl
// Declare a low precision float called t
lowp float t = 1.0;  
mediump float middle;
highp float zzz = -1.5;
```

Writing precision specifiers all the time can be a little tedious, so to save some keystrokes you can declare the precision of all floating point numbers in your code using the `precision` statement:

```glsl
//Now all floats are high precision
precision highp float;  

//Equivalent to: highp float x = 1.0;
float x = -0.1;  
```

## Constants

A variable can be declared `const`, which means that it can never be changed once initialized:

```glsl
//Define the constant PI
const highp float PI = 3.14159265359;
```

## In/out

While functions in GLSL return a single value, it is possible to simulate multiple returns using reference types. This is done using the following type qualifiers for procedure arguments:

* `in` Passes the argument by value (default behaviour)
* `inout` Passes the argument by reference
* `out` The argument is unitialized, but writing to the value updates the parameter
* `const` The argument is a constant value

For example:

```glsl
precision mediump float;

void testFunction(
  in float x,
  inout float y,
  out float z,
  const float w
) {
  x += 1.0;
  y += x;
  z = x + y + w;
}

void test() {
  float x=1.0, y=1.0, z=0.0, w=-1.0;

  testFunction(x, y, z, w);

  //Now:
  //  x == 1.0
  //  y == 3.0
  //  z == 4.0
  //  w == -1.0
}
```

## Built-ins

Finally, GLSL comes with a collection of builtin functions for performing common mathematical operations.  Here is an (incomplete) list of built in functions for operating on scalar datatypes, based on types:

* Unit conversion: `radians`, `degrees`
* Trigonometry: `sin`, `cos`, `tan`, `asin`, `acos`, `atan`
* Calculus:  `exp`, `log`, `exp2`, `log2`
* Algebra: `pow`, `sqrt`, `inversesqrt`
* Rounding: `floor`, `ceil`, `fract`, `mod`, `step`
* Magnitude: `abs`, `sign`, `min`, `max`, `clamp`
* Interpolation: `mix`
