# Introduction to Fragment shaders

## Fragment shaders

Fragment shaders are GLSL programs which are run on the GPU to determine the color of pixels. When drawing a polygon, rendering a line or creating some virtual image, OpenGL runs at least one fragment shader for each pixel on the screen.

### Fragments vs. pixels

One bit of notation in OpenGL is the distinction between fragments and pixels.  In OpenGL, a *pixel* is a single logically addressable element in a drawing buffer. A *fragment* represents the coverage of some fraction of a pixel. In the simplest case, there is a 1:1 relation between fragments and pixels (that is the color of every pixel is determined by exactly one fragment), but this is not necessarily the case in all situations. On displays with multisample anti-aliasing, it is often the case that each pixel is covered by many more fragments. The reason for this is that with more fragments and better sample coverage it is possible to create more accurate and sharper looking images.

One thing that is slightly mind boggling about fragment shaders is how fast they are executed. To get some idea of how much work the GPU does, consider a 2880x1800 display on a MacBook Pro 15" with 16x antialiasing.  Then just to fill the buffer at an interactive rate of 60Hz, a fragment shader would have to execute around 5 *billion* times per second! And this number is actually a low ball estimate, since pixels are usually rerendered multiple times to deal with occlusions.

### Basics of writing fragment shaders

Each fragment shader must specify a program entry point, which is done with a special procedure called `main()`.  `main()` takes no arguments and has no return value. Instead, the output from each fragment shader is one (or more) RGBA color values. These values are written by assigning to one of the components of the `gl_FragData[]` array. For example, here is a simple fragment shader that writes the color red:

```glsl
void main() {
  gl_FragData[0] = vec4(1, 0, 0, 1);    //Colors are represented by 4 vectors in RGBA order
}
```

The n-th entry in the `gl_FragData[n]` array represents the color that will be written to the color attachment at position `n`. The ability to write multiple color values is important for advanced multipass effects, like deferred shading. When we are rendering to the drawing buffer, which is the buffer that is actually displayed by WebGL, there is only one color buffer. For these situations, GLSL defines a helpful macro which aliases `gl_FragData[0]` to the variable `gl_FragColor`.  Using this trick, we could equivalently rewrite the above shader as:

```glsl
void main() {
  gl_FragColor = vec4(1, 0, 0, 1);
}
```

### Special fragment shader inputs

There are many types of input to fragment shaders, and we will cover them all in the course of this workshop. But for now, we are going to stick to the very simplest types, each of which is related to the location of the fragment in the buffer in some way.

#### `gl_FragCoord`

The first fragment shader input is `gl_FragCoord`.  `gl_FragCoord` is a 4D vector which returns the coordinate of the fragment in normalized device coordinates. Specifically:

* `gl_FragCoord.xy` is the coordinate of the fragment in units relative to the top-left of the buffer.  The y-component is the row of the fragment, and the x-coordinate is the column.
* `gl_FragCoord.z` is the depth value of the fragment, in units between `[0,1]`, where `0` represents the closest possible z value and `1` represents the farthest possible z-value.
* `gl_FragCoord.w` is the reciprocal of the homogeneous part of the fragment's position in clip coordinates

For now, we won't worry too much about `gl_FragCoord.z` and `gl_FragCoord.w`, since understanding them properly requires explaining how clip coordinates work (which we will come to when we introduce vertex shaders).

### The `discard` keyword

Finally, in GLSL it is possible to skip rendering a fragment with the `discard` statement.  For example, using this method we could remove all pixels on the back side of a polygon with this program:

```glsl
void main() {
  if(!gl_FrontFacing) {
    discard;
  }
  gl_FragData[0] = vec4(1, 0, 0, 1);
}
```

## Exercise

For this first fragment shader program, we will start with something simple.  Here you should write a fragment shader that draws a circle with a radius of `128` pixels centered at the point `vec2(256, 256)` in screen space.  The points inside the circle should be colored with `CIRCLE_COLOR` and the points outside the circle should be colored with `OUTSIDE_COLOR`.  To help get you started, a file called <a href="/open/frag-1" target="_blank">`fragment.glsl` has been created in this project's directory to help get you started</a>.

You should modify this shader so that it draws a circle rather than a pair of colored bars.