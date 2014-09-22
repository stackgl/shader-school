# Introduction to Fragment shaders

## Exercise

Write a fragment shader which draws a disk of radius `128` centered at the point `vec2(256,256)` in device coordinates. The points inside the disk should be colored with `CIRCLE_COLOR` and the points outside should be colored with `OUTSIDE_COLOR`. To help get you started, a file called `fragment.glsl` has been created in <a href="/open/07-frag-1" target="_blank">this project's directory</a> to help get you started.

***

### Fragments vs. pixels

A *fragment* is the color of some fraction of a pixel. In the simplest case, there is a 1:1 relation between fragments and pixels, though with anti-aliasing this ratio could be much higher. Fragment shaders are programs which are run on the GPU and determine the color of each fragment.

### Basics of writing fragment shaders

The entry point for each fragment shader is a special procedure called `main()`, which takes no arguments and has no return value. Tthe output from a fragment shader is one or more RGBA color values. These values are the components of a special builtin array called `gl_FragData[]`. Here is a simple fragment shader that outputs the color red:

```glsl
void main() {
  //Colors are represented by 4 vectors in RGBA order
  gl_FragData[0] = vec4(1, 0, 0, 1);
}
```

The n-th entry in the `gl_FragData[n]` array represents the color that will be written to the color attachment at position `n`. When we are rendering to the drawing buffer, which has only one color attachment, only the first component of `gl_FragData` will be used. For these situations, GLSL defines a helpful macro which aliases `gl_FragData[0]` to the variable `gl_FragColor`.  Therefore we could rewrite the above shader as:

```glsl
void main() {
  gl_FragColor = vec4(1, 0, 0, 1);
}
```

### gl_FragCoord

Every fragment shader also recieves a special input variable called `gl_FragCoord`. `gl_FragCoord` is a `vec4` which returns the coordinate of the fragment in device coordinates. Specifically:

* `gl_FragCoord.xy` is the coordinate of the fragment in units relative to the top-left of the buffer.  The y-component is the row of the fragment, and the x-coordinate is the column.
* `gl_FragCoord.z` is the depth value of the fragment, in units between `[0,1]`, where `0` represents the closest possible z value and `1` represents the farthest possible z-value.
* `gl_FragCoord.w` is the reciprocal of the homogeneous part of the fragment's position in clip coordinates
