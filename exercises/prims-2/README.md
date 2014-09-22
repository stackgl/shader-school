# Triangles

## Exercise

Write a fragment shader which colors fragments depending on their relative orientation to the view direction. If they are facing away from the camera, color them with `backColor`, or if they are facing towards the camera color them with `frontColor`.  To get started, a <a href="/open/28-prims-2" target="_blank">template file `fragment.glsl` has been created for you.</a>

***

### `gl_FrontFacing`

Triangle primitives in GLSL get a special property called called `gl_FrontFacing` which tests if they are oriented towards the camera or not. 