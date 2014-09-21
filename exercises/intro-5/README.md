# Loops


## Exercise

Implement a function which tests whether a point is inside the Mandelbrot set after 100 iterations.  The Mandelbrot set is a fractal, which is defined by iterating a chaotic map on the complex plane and testing which points converge.  Given an input point `c`, one iteration of the Mandelbrot function is defined as follows:

```glsl
vec2 mandelbrot(vec2 z, vec2 c) {
  return vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
}
```

And some iterations of the map are given as follows:

```glsl
vec2 z0 = vec2(0.0,0.0);        //No iterations
vec2 z1 = mandelbrot(z0, c);    // 1 iteration
vec2 z2 = mandelbrot(z1, c);    // 2 iterations

// ... and so on ...

vec2 zn = mandelbrot(zn_1, c);  // n iterations
```

As a general principle, say that a point in the Mandelbrot set diverges if it has a magnitude greater than 2, so we will classify points as inside the set if their magnitude is less than 2:

```glsl
bool mandelbrotConverges(vec2 z) {
  return length(z) < 2.0;
}
```

The Mandelbrot set is the collection of all points which do not diverge. Write a function which given a test point `c` tests if after 100 iterations it is still inside the Mandelbrot set.  To get started, a <a href="/open/05-intro-5">file `mandelbrot.glsl` has been created in this project's directory.</a>

***

## Loops

GLSL supports looping, but with the one catch that the number of times the loop executes must be statically determined and bounded.  For example, GLSL supports `for` loops just like JavaScript:

```glsl
float x = 0.0;
for(int i=0; i<100; ++i) {
  x += i;   //Executes 100 times
}
```

It is also possible to write `while` loops, again with the restriction that the loop must terminate.

```glsl
int i = 0;
while(i < 10) {
  i = i + 1;
}
```

The requirement that loops terminate in a finite number of iterations makes `while` loops a bit trickier to use than `for` loops.  It is also possible to terminate loops early using the `break` keyword, or skip an iteration using `continue`, just like in JavaScript.