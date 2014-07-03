# Uniform variables and textures

## Exercise

Write a program which swaps the red and blue color channels of a texture image. To do this, you should modify the <a href="/open/09-frag-3" target="_blank">`fragment.glsl` shader in this project's directory</a>. You will be given the following uniforms to help compute this quantity:

* `screenSize` which should be applied to scale the coordinates of `gl_FragCoord` to an acceptable range.
* `texture` which is a `sample2D` containing the texture to draw.

***

## Uniform variables

One way to send data to shaders is with `uniform` variables.  `uniform` variables can be set from within JavaScript and are broadcast to all executions of a shader. Here is how we could declare a fragment shader which takes as input some 4-vector called `foo` and assigns it to the fragment color:

```glsl
precision highp float;

uniform vec4 foo;

void main() {
  gl_FragColor = foo;
}
```

## Textures

Uniforms are a great way to send small, frequently changing information to shaders.  However, sometimes we might want to send a larger, static data to fragment shaders.  This can be done using *textures*.  Textures in WebGL are 2D arrays of vectors. Textures are declared using the `sampler2D` data type, and accessed using the built in function `texture2D`:

```glsl
precision highp float;

uniform sampler2D image;
uniform vec2 screenSize;

void main() {

  //Draws the texture to the screen
  vec2 uv = gl_FragCoord.xy / screenSize;
  gl_FragColor = texture2D(image, uv);
}
```

The built in `texture2D` has the following signature:

```glsl
vec4 texture2D(
  in sampler2D texture,
  in vec2 coordinate,
  in float bias = 0.0
);
```

Where:

* `texture` is a sampler variable.
* `coordinate` controls which data is read out from the texture.  Coordinates in the texture range from `0` to `1`.
* `bias` is an optional parameter that changes the filtering of the texture.
