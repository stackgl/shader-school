# Game of Life

## Exercise

In this [exercise's directory](/open/24-gpgpu-1) you'll find a file called `life.glsl`. Modify this file to create a fragment shader that implements Conway's game of life.

The fragment shader will be executed once per cell. Output vec4(1,1,1,1) if the cell is on, otherwise vec4(0,0,0,1) if the cell is off. The previous state of the world is stored in the sampler `prevState` and the size of the state buffer passed in the uniform `stateSize`.

***

The practice of using graphics processing units for purposes other than 3D graphics is called general purpose GPU computing, or GPGPU for short. This exercise explores using the GPU to solve for state updates in cellular automata.

## Game of life

Conway's Game of Life is a well known example of a 2D totalistic cellular automaton. The world in the game of life is a 2D grid of cells, which we shall assume wraps around at the boundary. In the game of life, updates proceed in rounds wherein each cell looks at its 8 neighbors and then determines its new state according to the following rules:

* Birth: If a cell is off and has exactly 3 neighbors, it turns on
* Life: If a cell is on, and has 2 or 3 neighbors it stays on
* Death: Otherwise, a cell turns off

Iterating these simple rules many times yields chaotic and mysterious patterns.
