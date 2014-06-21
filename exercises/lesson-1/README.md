# Data types in GLSL

## Vectors

After scalars, the next most important data type in GLSL are vectors.  GLSL comes with built in types for small vectors with up to 4 components.  Like scalars, vectors come in boolean, integer and floating point varieties which are declared using the following syntax:

* `bvec2, bvec3, bvec4`: Boolean vector
* `ivec2, ivec3, ivec4`: Integer vector
* `vec2, vec3, vec4`: Floating point vector

Floating point vectors and can have the same precision specifiers as floats, so `lowp vec2` is a low precision float vector, for example.  The vector type keywords are also used to construct vectors.  Here are some examples:

```glsl
precision mediump float;

vec3 v(1.0, 2.0, 3.0);    //Declares a 3D medium precision floating point vector with components (1,2,3)

lowp vec2 p = vec2(2.0);  //Create a low precision 2D vector with all components set to 2.0

highp vec4 q = vec4(v, 1.0);  //Unpack first 3 components from v into q and set last component to 1.0

bvec2 foo(true, false);   //A 2D boolean vector with true and false components

ivec3 q(1,0,-1);          //A 3D integer vector with components 1,0,-1
```

### Swizzles

GLSL has a lot of syntactic sugar for manipulating and accessing the components of vectors.  There are 3 basic types of notation, xyzw, rgba, and stuv.  These are interpreted and related as follows:

```glsl
First component of p  = p.x = p.r = p.s = p[0]
Second component of p = p.y = p.g = p.t = p[1]
Third component of p  = p.z = p.b = p.u = p[2]
Fourth component of p = p.w = p.a = p.v = p[3]
```

Ranges and subtypes of vectors can also be selected using the same symbols.  For example,

```glsl
vec4 p = vec4(1, 2, 3, 4);

//Select first two components of p
vec2 q = p.xy;  //q = vec2(1, 2)

//Or equivalently:
vec2 q = p.rg;

//You can also swizzle the entries:
vec2 r = p.zyx;  //r = vec3(3, 2, 1)

//Components can also be repeated
vec3 a = p.xxy;  //a = vec3(1, 1, 2)
```

Swizzle notation is useful when converting vectors from one format to another, and can help you write more compact code.

### Arithmetic operations

Arithmetic operations on vectors are applied component-wise.  For example, 

```glsl
vec4 a = vec4(1, 2, 3, 4);
vec4 b = vec4(5, 6, 7, 8);

//Add vectors
vec4 c = a + b;    //c = vec4(6, 8, 10, 12);

//Scalar multiplication
vec4 d = a * 3.0;  //d = vec4(3, 6, 9, 12);

//Component-wise multiplication
vec4 e = a * b;    //e = vec4(5, 12, 21, 32);
```

Addition, subtraction, multiplication, division and all the standard mathematical functions can be applied to the components of a vector in this manner.

### Geometric functions

In addition to the standard arithmetic functions, vectors also support several special geometric operations:

* `length(p)` returns the euclidean length of `p`
* `distance(a,b)` returns the euclidean distance between `a` and `b`
* `dot(a,b)` computes vector dot product of a and b
* `cross(a,b)` computes the cross product of two 3 vectors
* `normalize(a)` rescales a to unit length
* `faceforward`
* `reflect`
* `refract`

### Comparison functions

GLSL also supports component-wise comparison operations for vectors.  These are implemented as routines that take a pair of vectors and return a `bvec` whose entries correspond to the value of the predicate.  These functions are as follows:

* `lessThan(a,b)`
* `lessThanEqual(a,b)`
* `greaterThan(a,b)`
* `greaterThanEqual(a,b)`
* `equal(a,b)`

For example, `lessThan(a,b) is equivalent to the following function:

```glsl
bvec4 lessThan(vec4 a, vec4 b) {
  return bvec4(
    a.x < b.y,
    a.y < b.y,
    a.z < b.z,
    a.w < b.w);
}
```

### Boolean operations

GLSL also supports some special operations on boolean vectors:

* `any(b)` returns true if any component of `b` is true, true otherwise
* `all(b)` returns false if any component of `b` is false, true otherwise
* `not(b)` negates the logical value of the components of `b`

## Matrix data types

In addition to vectors, GLSL has special datatypes for representing low dimensional matrices.  There are only 3 of these:  `mat2, mat3, mat4` which correspond to a 2x2, 3x3 and 4x4 square matrix respectively:

```glsl
//Create a a 2x2 identity matrix.  Note matrix constructors are in column major order.
mat2 I = mat2(1.0, 0.0,
              0.0, 1.0);

//Equivalently,
mat2 I = mat2(1.0);

//Matrices can also be constructed by giving columns:
vec3 a = vec3(0, 1, 0);
vec3 b = vec3(2, 0, 0);
vec3 c = vec3(0, 0, 4);
mat3 J = mat3(a, b, c);

//Now:
//J = mat3(0, 2, 0,
           1, 0, 0,
           0, 0, 4);
```

The columns of matrices can be accessed using the square brackets.  For example:

```glsl
mat3 m = mat3(1.1, 2.1, 3.1,
              1.2, 2.2, 3.2,
              1.3, 2.3, 3.3);

//Read out first column of m
vec3 a = m[0];

//Now: a = vec3(1.3, 2.3, 3.3);
```

### Matrix arithmetic

Matrices support similar arithmetic operations to vectors.  Both scalar addition and vector addition are defined:

```glsl
mat2 m = mat2(1, 2,
              3, 4);
mat2 w = mat2(7, 8,
              9, 10);

//Component wise addition
mat2 h = m + w;
//Now: h = mat2(8,  10,
                12, 14)

//Scalar multiplication
mat2 j = 2.0 * m;
//Now: j = mat2(2, 4,
                6, 8)
```

The multiplication or `*` operator for matrices does not have the same meaning as for vectors.  Instead of being applied component-wise, it is used to implement matrix multiplication in the linear algebra sense. If you want to do component-wise multiplication, you can use the `matrixCompMult` function:

```glsl
mat2 m = mat2(1, 2,
              3, 4);
mat2 w = mat2(7, 8,
              9, 10);

mat2 q = matrixCompMult(m, w);

//q = mat2( 1, 16,
           27, 40)
```

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

## Exercise