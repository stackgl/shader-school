# The `discard` keyword

## Exercise

Create a shader which renders a checkerboard with 16x16 pixel tiles.  Tiles with even parity should be discarded, while tiles with odd parity should be drawn white. A template file called `fragment.glsl` has been created <a href="/open/08-frag-2" target="_blank">in this project's directory</a> to help get you started.

***

## discard;

In GLSL it is possible to skip rendering a fragment with the `discard` statement. If a pixel is discarded in the fragment shader, execution terminates immediately and nothing is written to the frame buffer.
