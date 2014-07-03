# Varying variables

## Exercise

In this exercise you will write a minimal vertex shader and fragment shader for rendering colored objects.

Specifically, you should declare a vertex shader with two attributes: `position` and `color`.  Your fragment shader should output the interpolated value of `color` to the `gl_FragColor` register. This will be used to draw a shaded triangle.

To get you started, a template vertex and fragment shader have been created in <a href="/open/11-vert-2" target="_blank">the directory for this lesson</a>.

***

## Connecting vertex shaders to fragment shaders

In addition to defining the position of vertices, vertex shaders can also send information directly to fragment shaders using the `varying` type qualifier.  `varying` variables, like `attribute`s and `uniform`s are declared at global scope within a shader. `varying` variables must have a datatype of either `float`, `vec2`, `vec3` or `vec4`. By default, `varying` variables are linearly interpolated across the rendered primitive. In a vertex shader, one could declare a variable like this:

```glsl
attribute vec4 position;

//Declare a varying variable called fragPosition
varying vec4 fragPosition;

void main() {
  gl_Position = position;

  //Set fragPosition variable for the
  //fragment shader output
  fragPosition = position;
}
```

Then in the fragment shader, the `fragPosition` variable can be used like so:

```glsl
precision highp float;

varying vec4 fragPosition;

void main() {
  gl_FragColor = fragPosition;
}
```
