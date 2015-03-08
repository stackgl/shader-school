# The `discard` keyword

## Exercise

Create a shader which renders a checkerboard with 16x16 pixel tiles.  Tiles with even parity should be discarded, while tiles with odd parity should be drawn white. A template file called `fragment.glsl` has been created <a href="/open/frag-2" target="_blank">in this project's directory</a> to help get you started.

#### Hint

To create a periodic 1D grid of tiles, you can use the fract and step functions:

```glsl
bool inTile(vec2 p, float tileSize) {
  vec2 ptile = step(0.5, fract(0.5 * p / tileSize));
  return ptile.x == ptile.y;
}
```

***

## discard;

In GLSL it is possible to skip rendering a fragment with the `discard` statement. If a pixel is discarded in the fragment shader, execution terminates immediately and nothing is written to the frame buffer.
