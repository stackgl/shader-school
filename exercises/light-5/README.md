# Multiple light sources

## Exercise

Modify the point light shader from the previous lesson to support multiple light sources. <a href="/open/21-light-5" target="_blank">Template files for this purpose have been created in the directory for this lesson.</a> The file `light.glsl` is used to define the datatype of the light values.  Use these parameters to apply multiple phong lighting contributions in the shader.

***

The Phong lighting model can be extended to support multiple lights by summing up their individual contributions. More generally, if `light0` and `light1` are light values from two different sources, their combined light value is:

```glsl
vec3 combinedLight(vec3 light0, vec3 light1) {
  return light0 + light1;
}
```

In the context of the phong lighting model, the ambient component is usually factored out and each individual point light is given a separate diffuse and specular component.

## Structs

To simplify describing multiple lights, it will be helpful to introduce the concept of a `struct`. These are declared in GLSL using the `struct` keyword.  For example, here is one way to set up a struct for a point light source:

```glsl
//Declare a datatype for a point light
struct PointLight {
  vec3 diffuse;
  vec3 specular;
  vec3 position;
  float shininess;
};

//Declare a single point light called light
PointLight light;

//Set the color of the light to red (1,0,0)
light.color = vec3(1, 0, 0);
```

## Arrays

GLSL also supports arrays, using the same syntax as C.  Just like JavaScript array indexes start from `0`, though unlike in JavaScript their size must be declared in advance. For example, here is how to declare an array of 10 point lights in GLSL:

```glsl
//Declare an array of 10 point lights
//called "lights"
PointLight lights[10];

//Modify the first light in the array
lights[0].radius = 100.0;
```
