# Introduction to vertex shaders

## Vertex shaders

Vertex shaders control how geometry is rendered in WebGL, and are executed on the GPU before fragment shaders. A vertex, in the terminology of OpenGL, is one of the components of a primitive. In WebGL there are 3 different primitive types:

* Points
* Lines
* Triangles

These different types are drawn by interpolating between 1, 2 and 3 vertices respectively. Vertex shaders control where the vertices of these primitives are placed on the screen before they are drawn. Like fragment shaders, the entry point for a vertex shader is a procedure called `main`. The output of a vertex shader is written to a special variable called `gl_Position` which controls the placement of the vertex. Here is an example of a trivial vertex shader program which just outputs vertices at the center of the screen:

```glsl
void main() {
  gl_Position = vec4(0, 0, 0, 1);
}
```

## Attributes

In addition to getting inputs from global `uniform` variables, vertex shaders can also accept per-vertex information via `attribute` variables. The content, type and number of attribute variables can be controlled from the external JavaScript which executes the shader. The total number of attribute variables is only limited by the WebGL implementation, but most systems support at least 16.

As an example of how to declare and use an attribute variable, here is a simple 2D pass through vertex shader:

```glsl
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0, 1);
}
```

## Exercises

Spinning wire cube or maybe point cloud?