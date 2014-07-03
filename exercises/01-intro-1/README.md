# Introduction to GLSL

## Exercise

In <a href="/open/01-intro-1" target="_blank">this lesson's directory</a> you'll
find a file called `hello.glsl` that exports a function called `sum`. Fix this
function to return the sum of its first two arguments.

***

## Overview of GLSL

This lesson covers the basics of shader programming with GLSL. In a few words, GLSL is a statically typed imperative programming language. Coming from JavaScript, the syntax of GLSL should be familiar with the same basic control flow structures: if statements and for loops, and semicolons and curly braces for delimiting statements and blocks.

However, there is one weird thing that makes GLSL different from most other programming languages -- *all GLSL programs must use a finite amount of memory and terminate in a finite time*.  This means no infinite loops, no recursion, no memory allocation and no strings.

## Variables

Variables in GLSL must be assigned a type when they are declared (unlike JavaScript) and are lexically scoped. While there are many datatypes in GLSL, to get started we are going to focus on a scalar variables, which represent single numerical or logical values. In GLSL, there only three scalar types:

* `bool` - which stores a logical truth value of either `true` or `false`
* `int` - which stores a signed integer value
* `float` - which is a fractional number

Here are some examples of how to declare a variable in GLSL:

```glsl
//Comments are written with slashes just like in JS

//Declares an integer called myInt:
//(note semicolons are not optional)
int myInt;

//Can declare multiple values on one line,
//all of these have type bool
bool a, b, c;

//Variables can be initialized when
//they are declared
bool someBoolean = true;
```

## Operators

Scalar datatypes support the same basic arithmetic operations as JavaScript.  On floating point numbers, the following operators are all defined: `+,-,*,/,<,>,<=,>=,==,!=`.  Additionally, variables can be updated by assignment using the `=` operator, and the related, `+=,-=,*=,/=,++,--` arithmetic assignments.  For example,

```glsl
//Declare floats x and y
mediump float x = 1.0, y = -2.0;

//Now: z = x + 3 y = -5
mediump float z = x + 3.0 * y;

//Add 1 to x, so now: x = 2
x++;  

//Now: z = -1
z += 2.0 * x;
```

## Procedures

GLSL allows for complex shaders to be decomposed into subroutines using C-like syntax. These subroutines may or may not return a value by a return statement.  Here is a subroutine which adds two integers together:

```glsl
//Declare a subroutine called "addTwoInts"
//with return type "int" that accepts two
//arguments, "x" and "y" both int type
int addTwoInts(int x, int y) {
  //Use a return statement to return a value
  return x + y;
}

//To declare a subroutine that does not
//return a value, give it the return type "void"
void doNothing() {
}
```
