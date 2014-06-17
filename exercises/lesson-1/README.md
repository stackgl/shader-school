# Vectors and Matrices

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

### Arithmetic operations


### Geometric functions

* `length`
* `distance`
* `dot`
* `cross`
* `normalize`
* `faceforward`
* `reflect`
* `refract`

### Comparison functions

* `lessThan`
* `lessThanEqual`
* `greaterThan`
* `greaterThanEqual`
* `equal`
* `any`
* `all`
* `not`


## Matrix data types

### Component access 

### Arithmetic

Note on `matrixCompMult`

### Matrices as transformations


## Exercise