# Scaling

Scaling transformations stretch or squish the coordinate axes. Specifically, scaling a vector `v` by a factor of `s` along each axis can be defined using the following function:

```glsl
vec3 scaleVector(vec3 v, vec3 s) {
  return s * v;
}
```

## Exercises

Scaling transformations are also linear in projective geometry. For this exercise, write a shader that computes a matrix representation of the above scaling function. To get started, a file called <a href="/open/geom-3" target="_blank">`scaling.glsl` has been created in this lesson's directory.</a>