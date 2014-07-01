# Scaling

## Exercise

Scaling transformations stretch or squish the coordinate axes. Specifically, scaling a vector `v` by a factor of `s` along each axis can be defined using the following function:

```glsl
vec3 scaleVector(vec3 v, vec3 s) {
  return s * v;
}
```

Like translation, scaling transformations are also linear in projective geometry. For this exercise, write a shader that computes a matrix representation of the scaling function above. To get started, a file called <a href="/open/14-geom-3" target="_blank">`scale.glsl` has been created in this lesson's directory.</a>

***

## See Also

* <a target="_blank" href="http://en.wikipedia.org/wiki/Scaling_(geometry)" title="Scaling (Wikipedia)">Scaling (Wikipedia)</a>
