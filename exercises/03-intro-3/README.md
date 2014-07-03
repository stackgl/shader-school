# Vectors

## Exercise

In this lesson, you will write a GLSL function which computes the unit angle bisector between two vectors.  That is, it is the vector whose length is `1` and whose angle is halfway between two vectors.  If the vectors are parallel or zero, you can return whatever you want. A file called <a href="/open/03-intro-3">`vectors.glsl` has been created for you as a template</a>.

As an example, if `a = vec2(1,0)` and `b = vec2(0,1)`, then you should return the result `vec2(sqrt(2)/2, sqrt(2)/2)`.

**Hint** It is useful to remember the angle bisector theorem.  In ascii art, suppose we have two vectors, A and B.  Then the angle bisector between A and B is the vector C:

```
 B
 ^
 |\
 | \^ C
 | /\
 |/  \
 *----> A
 O
```

In this situation, the angle bisector theorem tells us the following information about the ratio of the lengths of these vectors:

```glsl
length(B - C) / length(C - A) == length(B) / length(A)
```

Using the above equation, solve for the position of C and then normalize it to unit length.

***

After scalars, the next most important data type in GLSL are vectors.  GLSL comes with built in types for small vectors with up to 4 components.  Like scalars, vectors come in boolean, integer and floating point varieties which are declared using the following syntax:

* `bvec2, bvec3, bvec4`: Boolean vector
* `ivec2, ivec3, ivec4`: Integer vector
* `vec2, vec3, vec4`: Floating point vector

Floating point vectors and can have the same precision specifiers as floats, so `lowp vec2` is a low precision float vector, for example.  The vector type keywords are also used to construct vectors.  Here are some examples:

```glsl
precision mediump float;

//Declares a 3D medium precision floating point
//vector with components (1,2,3)
vec3 v(1.0, 2.0, 3.0);
//Create a low precision 2D vector with all
//components set to 2
lowp vec2 p = vec2(2.0);  
//Unpack first 3 components from v into q and
//set last component to 1.0
highp vec4 q = vec4(v, 1.0);  
//A 2D boolean vector with true and false
//components
bvec2 foo(true, false);
//A 3D integer vector with components 1,0,-1
ivec3 q(1,0,-1);
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

vec2 q = p.xy;   //q = vec2(1, 2)
vec2 r = p.bgr;  //r = vec3(3, 2, 1)
vec3 a = p.xxy;  //a = vec3(1, 1, 2)
```

Swizzle notation is useful when converting vectors from one format to another, and can help you write more compact code.

### Arithmetic operations

Arithmetic operations on vectors are applied component-wise.  For example,

```glsl
vec4 a = vec4(1, 2, 3, 4);
vec4 b = vec4(5, 6, 7, 8);

vec4 c = a + b;    //c = vec4(6, 8, 10, 12);
vec4 d = a * 3.0;  //d = vec4(3, 6, 9, 12);
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
* `faceforward(n, I, nr)` reorient a normal to point away from a surface
* `reflect(I, N)` - reflects a vector I along the axis N
* `refract(I, N, eta)` - applies a refractive transformation to I according to Snell's law
