# Compound datatypes and arrays

## Structs

While GLSL is not an object oriented programming language, it does support user defined data structures.  These are declared using the `struct` keyword.  For example, here is how you might declare a data structure for a point light source:

```glsl
//Declare a datatype for a point light
struct PointLight {
  vec3 position;
  vec3 color;
  float cutoff;
};

//Declare a single point light called light
PointLight light;

//Set the color of the light to red (1,0,0)
light.color = vec3(1, 0, 0);
```

## Arrays

GLSL also supports arrays, using the same syntax as C.  Just like JavaScript array indexes start from `0`, though unlike in JavaScript their size must be declared in advance. For example, here is how to declare an array of 10 point lights in GLSL:

```glsl
//Declare an array of 10 point lights called "lights"
PointLight lights[10];

//Modify the first light in the array
lights[0].radius = 100.0;
```

## Exercise