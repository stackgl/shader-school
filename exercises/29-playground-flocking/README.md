# Playground: Flocking

## Exercise

There is no exercise for this one! You're welcome to just muck around with the
code and see the results.

***

### Craig Reynolds' Boids

[Boids](http://en.wikipedia.org/wiki/Boids) is an artificial life program first
developed in the mid-1980s which simulates the flocking behavior of birds.
It's a classic example of [emergence](http://en.wikipedia.org/wiki/Emergence)
in simulation and a fun application of GPGPU.

The algorithm works by assigning each particle a position and a speed, and
then applying the following rules on each frame:

* **separation:** boids steer away from members of the flock when they get too close.
* **alignment:** boids steer to face the same direction as their neighbours.
* **cohesion:** boids cluster together with their neighbours.

Despite the simplicity of these rules, they result in formations that very much
resemble flocks of birds. The example here also includes an additional rule
to keep boids on-screen:

* **central attraction:** boids steer towards the center of the screen.
