# Point lights

## Exercise

In this exercise, generalize the Phong lighting shader from the previous lesson to support point light sources.  The `lightDirection` uniform has been replaced by a new uniform called `lightPosition`.

<a href="/open/20-light-4" target="_blank">Template files have been created in the directory for this lesson</a>, though you may find it expedient to copy your work from the previous directory.

***

Up until now, we have assumed that all our light sources are infinitely far away and so their geometry can be modelled by a single direction vector. Here, we will relax this assumption somewhat by generalizing to the situation where the lights are represented by idealized points which emit light uniformly in all directions.

To modify our previous lighting model to support point lights, all we need to do is replace the direction vector with a ray extending from the point on the surface to the light source.  That is, our new light direction becomes:

```glsl
vec3 lightDirection = normalize(
  lightPosition - surfacePosition
);
```
