# GPGPU: Texture Feedback

*in progress*

Your graphics card might have been designed for handling images, but it's
useful for solving certain problems *really* quickly too. Shaders on the GPU
run in *parallel*, and it's considerably better at handling thousands of small
independent tasks when pitted against a CPU. So if you're willing to work
around the specific restrictions of parallel computing, you can use the GPU
for general computation too.

This approach has been generalised to standards and platforms such as
[OpenCL](https://www.khronos.org/opencl/) and
[CUDA](http://www.nvidia.com/object/cuda_home_new.html). Unfortunately WebGL
doesn't have its own equivalent [(yet)](http://en.wikipedia.org/wiki/WebCL), so
for now we'll be using the classic
[ping pong technique](http://www.seas.upenn.edu/~cis565/fbo.htm#feedback2),
or texture feedback loop.

## FBO Ping-Pong

To create a texture feedback loop, we simply need to draw each frame using
the previous frame as input.

One restriction we have to work with is that when we're drawing to a framebuffer
we can't use that same framebuffer as input to the texture. To work around this
issue, we use two FBOs – one for rendering to, and one for reading from – and
switch them every frame.

<TODO an illustrative gif demonstrating the process>

A simple example would be:

``` javascript
var shader = require('./shaders/feedback-loop')
var frame1 = createFBO(gl)
var frame2 = createFBO(gl)

function render() {
  // Bind to our first FBO, and use the second one as
  // an input texture to the shader:
  frame1.bind()
  shader.uniforms.previous = frame2.color[0].bind()

  // Draw the scene to frame1:
  drawFrame()

  // Switch frame1 and frame2:
  var tmp = frame2
  frame2 = frame1
  frame1 = tmp
}
```

The end result is equivalent to creating a new framebuffer to draw to every
frame, and retaining the previous one for input. However this way we can avoid
the overhead in creating a new FBO every frame, which would be very expensive.

## A Simple Example

In this [exercise's directory](/open/gpgpu-1) you'll find a file called
`render.frag` that handles the general setup of an FBO ping pong shader. Update
it according to the instructions there to generate the expected output.
