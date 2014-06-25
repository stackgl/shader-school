# GPGPU: Cellular Automata

*in progress*

GPGPU starts to make more sense when you stop thinking about your shader as
creating or modifying an image, but instead consider that it's modifying
*an array*.

A classic example of this would be Conway's Game of Life (or Life, for short).

## A Simple Example

In this [exercise's directory](/open/gpgpu-2) you'll find a file called
`logic.frag` that handles the general setup of an FBO ping pong shader. Fix
it to properly run a simulation of Life.

We've scaled up the canvas and slowed down the render loop so that you can see
what's happening a little more clearly.
