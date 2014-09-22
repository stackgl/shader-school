# GPGPU: Separating Form and Function

Now that you've got a handle on manipulating data in a texture, it's time to
start slowly moving out of the constraints of that black-and-white image.

To keep things simple, we'll stick to the grid but simply map the colors to
different values.

In this [exercise's directory](/open/gpgpu-3) you'll find two shaders:

* `logic.frag` handles the cell update logic – you'll recognise this from the
  previous lesson.
* `render.frag` is new: it handles actually drawing the cells to the screen.

Fix the pair of shaders such that:

* Cells that are alive are colored `ALIVE`.
* Cells that are dead are colored `DEAD`.
* Cells that have been born this frame are colored `BIRTH`.
* Cells that have died this frame are colored `DEATH`.

To do this properly, you'll need to edit both shaders.
