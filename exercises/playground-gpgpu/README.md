# GPGPU Playground

## Exercise

There is no exercise for this lesson!  Play with the shaders and have fun!  The files for this module are stored in the <a href="/open/playground">answers/playground</a> directory.

***

For this lesson there are two fragment shaders:

* `render.glsl` Which draws the buffer state to the screen
* `update.glsl` Which computes the next buffer state from the previous buffer state

These shaders get the following inputs:

* `state` which is a history of the previous state textures
* `screenSize` which is the size of the buffer
* `mousePosition` which is the position of the user's mouse in screen coordinates
* `mouseDown` which is a 3D boolean vector
* `time` which is the time in seconds since the shader was initialized