# Wave equation

## Exercise

Implement a fragment shader which computes the the next state by explicit Euler integration.

The previous state is stored in the texture `prevState[0]` and the previous-previous state is in `prevState[1]`. To help get started, a <a href="/open/26-gpgpu-3" target="_blank">template file called `wave.glsl` has been created in the directory for this lesson</a>.

<span class="warn">**WARNING:**</span> This lesson requires the floating point texture extension. If your GPU/browser do not support this, then this lesson will not work.

***

The (damped) wave equation is similar to the heat equation, except that it has a second order time derivative:

```
     ( d^2 f   d^2 f )            d^2 f
kD * ( ----- + ----- ) - kM * f = -----
     ( d x^2   d y^2 )            d t^2
```

As before, this equation can be discretized using explicit Euler integration and finite differences.  However, because of the second order time dependency it is necessary to buffer two states instead of just one. This leads to the following update rule:

```
f(x,y,t+1) = (1 - kdamping) * (
  kdiffuse * laplace(f)(x, y, t) +
  2 * f(x,y,t)
) - f(x,y,t-1)
```

Where again laplace(f) is computed using a 5-point stencil:

```
laplace(f)(x,y,t) = (
  f(x-1,y,t) +
  f(x+1,y,t) +
  f(x,y-1,t) +
  f(x,y+1,t)
) - 4 * f(x,y,t)
```
