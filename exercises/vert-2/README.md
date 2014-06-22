# Varying variables

## Connecting vertex shaders to fragment shaders

In addition to defining the position of vertices, vertex shaders can also send information directly to fragment shaders using the `varying` type qualifier.  `varying` variables, like `attribute`s and `uniform`s are declared at global scope within a shader. `varying` variables must have a datatype of either `float`, `vec2`, `vec3` or `vec4`. By default, `varying` variables are linearly interpolated across the rendered primitive. Here is a simple example of using a `varying` variable to change the color of a triangle:

#### Vertex shader:

```glsl
precision highp float;

attribute vec4 position;
attribute vec3 color;

varying vec3 fragColor;

void main() {
  fragColor = color;
  gl_Position = position;
}
```

#### Fragment shader:

```glsl
precision highp float;

varying vec3 fragColor;

void main() {
  gl_FragColor = vec4(fragColor, 1);
}
```

This program will draw a colored

## Exercise

