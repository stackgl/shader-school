# Translations

One of the most basic perspective transformations are translations.  A translation of a vector `v` moving the point `o` to the origin is a function:

```glsl
vec3 translatePoint(vec3 v, vec3 o) {
  return v - o;
}
```

Translations are not linear in affine coordinates, however in projective homogeneous coordinates they are.  As a result, they can be written as a matrix.  

## Exercises

For this exercise, you will work out how to do this yourself.  That is, you should implement a GLSL function which constructs a 4x4 matrix representing a translation moving a point `p` to the origin:

```glsl
highp mat4 translate(highp vec3 p) {

  //TODO: Construct a matrix, m, which translates all points so that p is at the origin.
  
  return highp mat4(1, 0, 0, 0,
                    0, 1, 0, 0, 
                    0, 0, 1, 0,
                    0, 0, 0, 1);
}
```

Note that GLSL matrices are stored in column major order, not row major as matrices are commonly written.  This means that the entries of the matrix are transposed with respect to the usual notation.