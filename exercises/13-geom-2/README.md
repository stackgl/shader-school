# Translations

## Exercise

One of the most basic perspective transformations are translations.  A translation of a vector `v` moving the point `o` to the origin is a function:

```glsl
vec3 translatePoint(vec3 v, vec3 o) {
  return v - o;
}
```

Translations are not linear in affine coordinates, however in projective homogeneous coordinates they are.  As a result, they can be written as a matrix.  

For this exercise, you will work out how to do this yourself.  That is, you should implement a GLSL function which constructs a 4x4 matrix representing a translation moving a point `p` to the origin. To get started modify the file `translate.glsl` <a href="/open/13-geom-2" target="_blank">in the directory for this lesson</a>.

Note that GLSL matrices are stored in *column major* order, not *row major* as matrices are commonly written.  This means that the entries of the matrix are transposed with respect to the usual notation.

***

## See Also

* <a target="_blank" href="http://en.wikipedia.org/wiki/Translation_(geometry)" title="Translation (Wikipedia)">Translation (Wikipedia)</a>
