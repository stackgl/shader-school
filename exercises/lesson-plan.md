# Core lesson plan

## Basic GLSL

* introduction to glsl
* vectors and matrices
* loops and control flow, preprocessor, structs and arrays

## Fragment shaders

* introduction to fragment shaders
* uniform variables & textures

## Vertex shaders

* introduction to vertex shaders (wire cube)
* varying-variables/hello shader (draw flat colored polygons with model/view/projection matrix)

## Projective geometry

* Clip coordinates
* Transformations

## Lighting

* flat shading
* lambertian
* blinn-phong
* point lights
* spot lights
* multiple light sources
* oren-nayar (advanced)
* cook-torrance (advanced)
* (shadows and reflections might be too much, and require multipass stuff)

## NPR

* cel shading
* gooch shading
* real-time hatching (praun et al)

# Optional stuff

## Color space

* rgb coordinates
* hsl
* dynamic range/tonemapping

## Image processing

* convolutions
    + blur
    + edge enhancment maybe
* morphological
    + dilate/erode
    + open/close
* warping
* mip mapping

## Antialiasing

## Raytracing

* perhaps have students implement a simple glsl raytracer for some quadric surfaces

## More shaders

* point sprites/billboards
* cube maps
* raycasting
* bump mapping/normal mapping
* cone tracing
* blending/transparency

## Extensions

* dFdx/dFdy extensions
* multiple render targets
* frag_depth

## glslify

* some example using multiple files
* some example using a module from npm (maybe glsl-random?)

## Advanced shaders

* ssao

## feedback effects

* simple texture feedback
* cellular automata
* separate logic and render shaders
* floating point textures
* particle system: gl.POINTS