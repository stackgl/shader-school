# Uniform variables and textures

## Uniform variables

Another way to pass input to shaders is with `uniform` variables.  `uniform` variables can be set from within JavaScript and are broadcast to all instances of a shader. For example, here is how we could declare a fragment shader which takes as input some 4-vector called `foo` and assigns it to the fragment color:

```glsl
precision highp float;

uniform vec4 foo;

void main() {
  gl_FragColor = foo;
}
```

`uniform` variables can be any datatype, even structs and arrays.  For example, if you want to define a point light, it is possible to make all of the lights a uniform:

```glsl
precision highp float;

#define MAX_LIGHTS 16

struct PointLight {
  vec3 position;
  vec3 color;
  float intensity;
};

PointLight lights[MAX_LIGHTS];

void main() {
  
  // .. calculate color of fragment using all lights, etc.
}
```

## Textures

Uniforms are a great way to send small, frequently chaning information to shaders.  However, sometimes we might want to send a larger, static chunk of data to our shaders.  This can be done using *textures*.  Textures in WebGL are 2D arrays of vectors. In GLSL, the notation for textures is a bit funny. Accessing the data in a texture in a fragment shader is done using the keyword `texture2D`, but are declared using a special datatype called `sampler2D`.  Here is an example:

```glsl
precision highp float;

uniform sampler2D image;
uniform vec2 screenSize;

void main() {

  //Draws the texture to the screen
  gl_FragColor = texture2D(image, gl_FragCoord.xy / screenSize);
}
```

Textures are set up and passed to GLSL from the WebGL side of things. Also, unlike other data types it is impossible in GLSL to overwrite or change the data in a texture directly within a shader. The type of the built in function `texture2D` is as follows:

```glsl
vec4 texture2D(in sampler2D texture, in vec2 coordinate, in float bias = 0.0);
```

The first parameter, `texture`, is the texture variable itself.  The second, `coordinate`, controls which data is read out from the texture.  Coordinates in the texture range from `0` to `1` and must be in 2D. Finally, `bias` is an optional parameter that changes the filtering of the texture from coarse to fine. There is also a variation of `texture2D` called `texture2DProj`, which takes a homogeneous vector as input instead of a 2D vector.  This version can be more accurate for rendering projected or transformed textures, like shadow maps.

## Exercise

Write a program which rotates a texture by `theta` radians above the horizontal axis about the point `center`.

The shader program will be sent the following uniform variables:

* `texture` - Which is the texture to be rotated
* `screenSize` - A 2D vector representing the size of the drawing buffer. Use this to rescale `gl_FragCoord.xy`
* `theta` - A float representing the angle to rotate by in radians
* `center` - The point about which you should rotate. This is given in `[0,1]` texture units - not screen coordinates


**Note** Here are a few basic facts about coordinate transformations which should help get you started:

To rotate the vector `[x,y]` by the angle theta, we can use the rule:

```
[x,y]  ->   [cos(theta) * x + sin(theta) * y,  -sin(theta) * x + cos(theta) * y]
```

And to translate a vector so that the point `[s,t]` is at the origin, we can just subtract the two vectors:

```
[x,y]  ->   [x-s, y-t]
```