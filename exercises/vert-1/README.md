# Introduction to vertex shaders

## Exercises

For this exercise you will write a shader which applies a 2D rotation to a vertex.  Specifically, create a vertex shader that accepts the following parameters:

* A `vec2` attribute called `position` representing the position of the vertices in the plane
* A `float` uniform `theta` encoding the amount to rotate by in radians

Edit the file called <a href="/open/10-vert-1" target="_blank">`vertex.glsl` in the directory of this project</a>.

***

## Vertex shaders

Vertex shaders control how geometry is rendered in WebGL, and are executed on the GPU before fragment shaders. A vertex in OpenGL is one of the corners of a primitive.  Primitives in OpenGL are simplices of dimension < 3, and are called:

* Points - 1 vertex
* Lines - 2 vertices
* Triangles - 3 vertices

Primitves are drawn by linearly interpolating between their vertices, and vertex shaders control where the vertices of these primitives are placed on the screen. Like fragment shaders, the entry point for a vertex shader is a `void` procedure called `main()`. The output of a vertex shader is written to a special variable called `gl_Position` which controls the placement of the vertex in clip coordinates. Here is an example of a trivial vertex shader program which just outputs a vertex at the center of the screen:

```glsl
void main() {
  gl_Position = vec4(0, 0, 0, 1);
}
```

## Attributes

In addition to getting inputs from `uniform` variables, vertex shaders can also accept per-vertex information via `attribute` variables. The content, type and number of attribute variables is customizable within WebGL. As an example of how to declare and use an attribute variable, here is a simple 2D shader that just passes through the vertex coordinates:

```glsl
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0, 1);
}
```
