# Lighting models

## Exercise

As a warm up, we will start with the very simplest lighting model, which is called "flat shading".  In flat shading, the light reflected from any surface to the detector is assumed to be constant. That is, there is some parameter called `kA` which just determines the color of each fragment.

<a href="/open/17-light-1" target="_blank">The files `vertex.glsl` and `fragment.glsl` have been provided</a> as well as the appropriate uniform and attribute variables for the camera.  Apply the model, view and projection transformation matrices as in the `GEOM 1` exercise.

***

## Aside on the nature of rendering

Physically, images are formed by the interaction of lightwaves with some detector (like a camera CCD, eyeball retina, etc.). These lightwaves are formed by the interaction of the electromagnetic field with different materials. These interactions include reflection, transmission, absorption and emission of electromagnetic radiation. In human terms, visible light waves are high frequency (with wavelengths on the order of nanometers), and travel at incredible speeds, so to us humans light's wave-like nature is imperceptible. As a result, physical images can be well appoximated using geometrical objects, which replaces light waves with "rays".

The physical interpretation of a ray in geometric optics is that it is a line perpendicular to the wave front representing the amount of energy in the wave at some particular frequency, ignoring polarization. Natural light is composed of infinitely many different frequencies, however human vision can only distinguish between three different classes of frequencies: red, green and blue (though rarely there are some mutants who can see up to 4 or 5 different types colors). As a result, if we are rendering images we only need to track the amount of energy in the red, green and blue color bands for each ray when we are ray tracing the image.

In high end computer graphics, ray tracing is widely used to generate physically realistic images. But for interactive applications like games, even the ray tracing approximation of light is still too slow. Instead, real time applications must usually make do with even more limited models of light transport and interactions. In this section and its sequels, we will discuss a few classical models of light transport and you will get to try implementing them as an exercise. These models make different assumptions about the types of materials they represent, which lead to different looking surfaces. While they may be physically motivated, they are generally consistent with what would be expected from a realistic theory of light. However, they can still produce compelling images and often serve as a useful starting point for developing newer or customized models of light.
