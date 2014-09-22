# Non-photorealistic rendering

## Exercise

Modify the Lambert diffuse lighting model from `LIGHT 2` to support cel shading.  The shader will be passed an extra uniform called `numBands` which determines the number of levels the light intensity should be quantized to.  To get started, <a href="/open/22-npr-1" target="_blank">modify the template files in this directory</a>.

***

## Cel shading

Physically based models of lighting are good when the goal is to create realistic images. However, there are many situations where the goal is to achieve some more artistic or stylized rendering. In this lesson, we will look at cel-shading, which is used to flatten the colors of an image giving them a more cartoony hand drawn look.

The basic idea behind cel-shading is to start from the Lambert diffuse lighting model, and then apply quantization to intensity values.  For example, suppose that we want to round our light value into one 8 different buckets which are uniformly sized.  Then we could do something like this:

```glsl
float celIntensity = ceil(lightIntensity * 8.0) / 8.0;
```

Then we would use `celIntensity` instead of `lightIntensity` in the rest of the calculations within our lighting model.
