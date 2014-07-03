# Rotations

## Exercise

Again, rotations are linear perspective transformations and so they can be written as matrices. For this exercise, you should translate the `rotatePoint` function below into a matrix. For the solution, <a href="/open/16-geom-5" target="_blank">modify the file `rotate.glsl` in this lesson's directory.</a>

***

A *rotation* is the composition of an even number of reflections. In higher dimensions, rotations can be very complicated structures.  However, it turns out that 3D geometry is rather unique as it admits a number of special ways to describe rotations that turn out to be very useful in practice.

One of these methods which is very useful is axis-angle notation.  Specifically any 3D rotation can be represented as a rotation in a plane about some axis.  The reason that this is possible is that all 3D rotations can be written as the product of exactly 2 reflections.  The common line of the plane between the two planes of reflection is called the *axis of the rotation*, and the angle between the two planes is called the *angle of rotation*.  This definition turns out to be independent of whichever two plane reflections we use to factor the rotation.

This relation between rotations and axis-angle pairs is captured by a beautiful result called Rodrigues' rotation formula.  In GLSL, we can translate Rodrigues' rotation formula into a function that rotates a point `p` about the unit axis `n` with angle `theta` as follows:

```glsl
vec3 rotatePoint(vec3 p, vec3 n, float theta) {
  return (
    p * cos(theta) + cross(n, p) *
    sin(theta) + n * dot(p, n) *
    (1.0 - cos(theta))
  );
}
```
