# Introduction to GLSL

We're going to start slow here for those who have never programmed in GLSL before. The goal here is to slowly ease into shader programming.  We are going to start by writing small snippets of GLSL, build up to partial shaders and eventually transition into writing more complex GPU programs.

## Overview of GLSL

This first lesson covers the basics of shader programming with GLSL. In a few words, GLSL is a programming language which is:

* compiled
* statically typed
* imperative

Coming from JavaScript, the syntax of GLSL should be familiar with the same basic control flow structures: if statements and for loops, and semicolons and curly braces for delimiting statements and blocks.  GLSL is not whitespace sensitive, so you can indent your programs in whatever way makes you happiest.

However, there is one weird thing that makes GLSL profoundly different from most other programming languages -- *all GLSL programs must use a finite amount of memory and terminate in a finite time*.  This means that the following things are impossible in GLSL:

* No infinite loops
* No recursion
* No dynamic memory allocation
* No strings
* No objects
* No closures

The payoff for accepting this constraint is that GLSL programs can be safely executed on the GPU with massive parallelism.

## Variables

Variables in GLSL must be assigned a type when they are declared (unlike JavaScript) and are lexically scoped. While there are many datatypes in GLSL, to get started we are going to focus on a small subset of the primitive types which are supported in GLSL:

### Scalars

The simplest datatypes in GLSL are scalars, which represent simple numerical or logical types. In GLSL, there only three scalar types:

* `bool` - which stores a logical truth value of either `true` or `false`
* `int` - which stores a signed integer value
* `float` - which is a fractional number

Here are some examples of how to declare a variable in GLSL:

```glsl
//Comments are written with slashes just like in JS

int myInt;      //Declares an integer called myInt (not semicolons are not optional)

bool a, b, c;   //Can declare multiple values on one line, all have type bool

bool someBoolean = true; //Variables can be initialized when they are declared
```

### Precision specifiers

Floating point variables are declared with an optional precision specifier, which says how many bits are used to represent them.  The possible precision specificiers are:

* `lowp` - Lowest precision supported on the available hardware
* `mediump` - Default precision supported on the hardware
* `highp` - Highest precision supported on the hardware

The number of bits available at the different precision levels can vary between implementations, but a general rule of thumb is that `lowp` is usually 16bits, `mediump` is 32bit, and `highp` is either 64bit or 32bit, though this is not true 100% of the time.  On some systems, `lowp` is 8bit, `mediump` is 16bit and `highp` is 32bit.  Also some systems implement lower precision specifiers using fixed point arithmetic instead of true IEEE floating point.  This situation is less problematic on modern GPUs.

To declare a floating point variable, you just write the precision specifier then `float`.  For example:

```glsl
lowp float t = 1.0;  // Declare a low precision float called t

mediump float middle;

highp float zzz = -1.5;
```

Writing precision specifiers all the time can be a little tedious, so to save some keystrokes you can declare the precision of all floating point numbers in your code using the `precision` statement:

```glsl
precision highp float;  //Now all floats are high precision

float x = -0.1;  //Equivalent to highp float x = 1.0;
```

### Constants

Finally, a variable can be declared `const`, which means that it can never be changed once initialized:

```glsl
//Declare the variable PI to be a constant
const highp float PI = 3.14159265359;

const int ZERO = 0;   //Now ZERO = 0

const int ONE = ZERO + 1;
```

## Operators

Scalar datatypes support the same basic arithmetic operations as JavaScript.  On floating point numbers, the following operators are all defined: `+,-,*,/,<,>,<=,>=,==,!=`.  Additionally, variables can be updated by assignment using the `=` operator, and the related, `+=,-=,*=,/=,++,--` arithmetic assignments.  For example,

```glsl
mediump float x = 1.0, y = -2.0;  //Declare floats x and y

mediump float z = x + 3.0 * y;    //Now: z = x + 3 y = -5

x++;  // Add 1 to x, so now: x = 2

z += 2.0 * x; // Now: z = -1
```

## Procedures

To simplify writing programs, GLSL allows for complex shaders to be decomposed into subroutines using a simple C-like syntax. These subroutines may or may not return a value by a return statement.  For example, here is a subroutine which adds two integers together:

```glsl
//Declare a subroutine called "addTwoInts" with return type "int" that accepts two arguments, "x" and "y" both int type
int addTwoInts(int x, int y) {
  return x + y;       //Use a return statement to return a value
}

//To declare a subroutine that does not return a value, give it the return type "void"
void doNothing() {
}
```

**Warning** Unlike in JavaScript, GLSL procedures can not be nested:

```glsl
void someProcedure() {
  
  //COMPILE ERROR:  This is illegal in GLSL!
  void nestedProcedure() {
  }
}
```

### Scoping

Variables can also be declared within a subroutine and have a scope limited to that subroutine.  Variables declared outside a subroutine are global, and can be accessed by any subroutine:


```glsl
precision mediump float;

float x = 10.0;     //A global variable

void addOneToX() {
  x += 1.0;         //This updates the global variable x
}

float doAThing(float y) {  
  float z = y + x;    //z is local to the function doAThing()
  addOneToX();
  return z + x;
}
```

### Qualifiers

While functions in GLSL can have only a single return value, it is possible to pass inputs to procedures by reference using type qualifiers.  In this way, functions with multiple return values can be approximated.  The possible type qualifiers are as follows:

* `in` Passes the argument by value (default behaviour)
* `inout` Passes the argument by reference
* `out` The argument is unitialized, but writing to the value updates the parameter
* `const` The argument is a constant value

Here is an example:

```glsl
precision mediump float;

void testFunction(in float x, inout float y, out float z, const float w) {
  x += 1.0;
  y += x;
  z = x + y + w;
}


void test() {
  float x=1.0, y=1.0, z=0.0, w=-1.0;

  testFunction(x, y, z, w);

  //Now:
  //  x == 2.0
  //  y == 3.0
  //  z == 4.0
  //  w == -1.0
}
```

### Built-in functions

Finally, GLSL comes with a collection of builtin functions for performing common mathematical operations.  Here is an (incomplete) list of built in functions for operating on scalar datatypes, based on types:

* Unit conversion: `radians`, `degrees`
* Trigonometry: `sin`, `cos`, `tan`, `asin`, `acos`, `atan`
* Calculus:  `exp`, `log`, `exp2`, `log2`
* Algebra: `pow`, `sqrt`, `inversesqrt`
* Rounding: `floor`, `ceil`, `fract`, `mod`, `step`
* Magnitude: `abs`, `sign`, `min`, `max`, `clamp`
* Interpolation: `mix`

## Your first GLSL procedure

With the above information, you should now be able to write a simple GLSL procedure yourself.

In <a href="/open/intro-1" target="_blank">this lesson's directory</a> you'll
find a file called `hello.glsl` that exports a function called `sum`. Fix this
function to return the sum of its first two arguments.

### Note on the workshopper

On the bottom you will find three buttons and a slider.  These will allow you to compare your implementation to an existing solution. The left button does a component-wise comparison of the color channels, the middle a side-by-side cutaway, and the right onion skinning. When you are done, click on the check box at the top to submit your lesson, or hide the panel by clicking x.