# glslify-workshopper

**WORK IN PROGRESS**

## Running this thing

First, you need to get a browser with WebGL, as well as a copy of node.js.  Once you have all of that set up, clone this repository, `cd` into the `glslify-workshopper` directory and do:

```
npm install
```

After that completes, you should be able to run the workshopper with the command:

```
npm start
```

The script will ask you if you want to create an answer directory, press `y` to accept.  After that's done it should create a directory called `answers` which you can then edit.  If the system crashes, you can just rerun the `npm start` script and it should pick back up where you left off.

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
* trigger tests to check if passed.
* record student progress.

## TODO

* back button to return to menu.
* image/text preview on hover for lesson menu?
* make the exit button work.
* in-browser editor, e.g. like [glsl.heroku.com](http://glsl.heroku.com)?
  low priority perhaps...

## Color scheme

![color scheme](http://imgur.com/mcbbaNt.png)

From left to right:

* `#34363B` `vec3(0.2039, 0.2117, 0.2313)` (black)
* `#A9B0C3` `vec3(0.5372, 0.6901, 0.7647)` (dark grey)
* `#DEE7FF` `vec3(0.8705, 0.9058, 1.0)` (light grey)
* `#FFFFFF` `vec3(1.0, 1.0, 1.0)` (white)
* `#58FF8B` `vec3(0.3451, 1.0, 0.5450)` (green)
* `#FF6E57` `vec3(1.0, 0.4313, 0.3411)` (red)
* `#FFE25F` `vec3(1.0, 0.8862, 0.3725)` (yellow)
* `#61C3FF` `vec3(0.3804, 0.7647, 1.0)` (blue)
