# demo lesson

This lesson is just an example.

The "expected" shader is the checkerboard of blue/red squares, and the "actual"
shader is the grid with a slight gradient.

All the shaders have had [glslify-live](http://github.com/hughsk/glslify-live)
applied, so you can modify their file contents and they'll update without
needing to refresh the page. Unfortunately it's not resistant to syntax errors
yet so right now will crash the workshop if a shader is ever invalid on save.

`exercises/lesson-1/files/triangle.frag` will be copied to
`lesson-1/triangle.frag` for the student to modify themselves, and the rest
will be kept hidden away. If time permits we might want to also copy over a
dummy project which runs the shader standalone on `npm start`?
