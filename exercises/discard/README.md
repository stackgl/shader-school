## The `discard` keyword

In GLSL it is possible to skip rendering a fragment with the `discard` statement. If a pixel is discarded in the fragment shader, execution terminates immediately and nothing is written to the frame buffer. 

## Exercise

Create a shader which renders a checkerboard with 16x16 pixel tiles.  Tiles with even parity should be discarded, while tiles with odd parity should be drawn white. <a href="/open/discard" target="_blank">A template file called `fragment.glsl` has been created in this project directory to help get you started.</a>