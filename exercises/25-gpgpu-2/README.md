# Heat equation

## Exercise

Implement a shader which computes a single step of the explicit Euler scheme for integrating the heat equation, described below.

The previous state of `f(x,y,t-1)` will be encoded in a periodic texture. The diffusion constant and damping will be sent in the parameters `kdiffuse` and `kambient` respectively.

To get started, there is a file called <a href="/open/25-gpgpu-2" target="_blank">`heat.glsl` in the directory for this lesson</a>.

***

The damped heat equation is a second order linear partial differential equation which describes the flow of heat through a material. In the continuous 2D setting it is described by the following equation:

```
     ( d^2 f   d^2 f )            d f
kD * ( ----- + ----- ) - kM * f = ---
     ( d x^2   d y^2 )            d t
```

In this equation, `f(x,y,t)` is time evolving scalar field, representing the distribution of heat in the material. The parameter `kD` is the diffusion constant and controls the rate at which heat spreads, while `kM` is the damping factor which reprsents the rate at which heat is lost/gained. Equations of this sort are well studied in mechanics and engineering, and its solution has many applications.

## Euler integration

One way to solve this equation is to discretize it and numerically integrate to obtain a solution. Without going too far into the details of how this works, supposing that `f(x,y,t)` is uniformly sampled on a unit grid, then the left hand side of the equation can be written using a stencil operation:

```glsl
float laplace(x, y) {
  return (
    prevState(x-1,y) +
    prevState(x+1,y) +
    prevState(x,y-1) +
    prevState(x,y+1)
  ) - 4.0 * prevState(x,y);
}
```

And with damping, the update rule for the integrator becomes:

```glsl
nextState(x,y) = (1.0 - kDamping) * (
  kDiffuse * laplace(x,y) + prevState(x,y)
)
```
