# Branching

## Exercise

In this exercise write a subroutine to test if a point is contained in a bounding box defined by a pair of upper and lower bounds. A template file called `box.glsl` has been created <a href="/open/04-intro-4" target="_blank">in the directory for this purpose</a>.

***

## If statements

Like JavaScript, GLSL has `if` statements for conditional branching. The syntax is identical:

```glsl
if(a < 0.5) {
  //Executed only if a < 0.5
} else {
  //Executed otherwise
}
```

Unlikes JavaScript though, branches in GLSL are very expensive so they should be used sparingly.

## Comparisons

GLSL also supports component-wise comparison operations for vectors.  These are implemented as routines that take a pair of vectors and return a `bvec` whose entries correspond to the value of the predicate:

* `lessThan(a,b)`
* `lessThanEqual(a,b)`
* `greaterThan(a,b)`
* `greaterThanEqual(a,b)`
* `equal(a,b)`

for example: `a < b` == `lessThan(a, b)`

## Boolean operations

Boolean vectors also support the following special aggregate operations:

* `any(b)` returns true if any component of `b` is true, false otherwise
* `all(b)` returns false if any component of `b` is false, true otherwise
* `not(b)` negates the logical value of the components of `b`
