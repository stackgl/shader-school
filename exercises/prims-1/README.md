# Point sprites

## Exercise

Create a vertex/fragment shader pair to render a collection of colored point sprites. <a href="/open/27-prims-1" target="_blank">A pair of starting shaders have been created in the directory for this lesson to help get started.</a> These shaders get a standard collection of camera matrices factored into the model/view/projection transformations.  In addition, the shaders also get 3 attributes:

* `position` which is the position of each point sprite
* `color` which is the color of each point sprite
* `size` which is the desired radius of the point sprite in pixels

Modify the starting shaders so that they draw each point sprite as a disk with `size` radius and `color` as the RGB fragment color.

***

## Point sprites

Besides rendering triangles, WebGL also has special features for drawing point sprites. Point sprites can be useful for particle effects or 2D objects. From the perspective of shaders there are two extra variables in point sprites which can be used by shaders: `gl_PointSize` and `gl_PointCoord`.

### `gl_PointSize`

The `gl_PointSize` variable is an extra `float` output variable for vertex shaders which is only defined when drawing points. It controls the radius of the point in pixels, and can be assigned by the vertex shader.

### `gl_PointCoord`

`gl_PointCoord` is a special fragment shader input `vec2` variable which gives the coordinate of the fragment in the sprite starting from the upper left corner. The coordinates of `gl_PointCoord` range from 0 to 1.