# glslify-workshopper

**WORK IN PROGRESS**

## Creating a new exercise

Add an entry to `exercises.json`. Each key is the label used in the menu, and
each value is the name of the directory in `exercises` to use.

Create a new directory in `exercises`. All that is expected is a `server.js`
file, which should export a function which takes an array of file names (the
ones a student modifies locally) and return a function with the signature
`(req, res)`.

Everything else is optional and can be included/excluded to match the
requirements of the exercise, though you'll probably want to include your own
`index.html` file in there too. [lesson-1](exercises/lesson-1) should be a
reasonable example of how to build up an exercise.

## DONE

* workshopper-style exercise menu.
* bootstraps lesson files for students in the working directory.
* diffs between actual/expected render loop.
* live-reloads shaders on save.
* lesson descriptions.
* magically inline local files using envify.

Color scheme:

![color scheme](http://imgur.com/mcbbaNt.png)

## TODO

* trigger tests to check if passed.
* back button to return to menu.
* record student progress.
* image/text preview on hover for lesson menu?
* make the exit button work.
* in-browser editor, e.g. like [glsl.heroku.com](http://glsl.heroku.com)?
  low priority perhaps...
