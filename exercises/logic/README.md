# If statements




### Comparison functions

GLSL also supports component-wise comparison operations for vectors.  These are implemented as routines that take a pair of vectors and return a `bvec` whose entries correspond to the value of the predicate.  These functions are as follows:

* `lessThan(a,b)`
* `lessThanEqual(a,b)`
* `greaterThan(a,b)`
* `greaterThanEqual(a,b)`
* `equal(a,b)`

For example, `lessThan(a,b) is equivalent to the following function:

```glsl
bvec4 lessThan(vec4 a, vec4 b) {
  return bvec4(
    a.x < b.y,
    a.y < b.y,
    a.z < b.z,
    a.w < b.w);
}
```

### Boolean vectors

GLSL also supports some special operations on boolean vectors:

* `any(b)` returns true if any component of `b` is true, true otherwise
* `all(b)` returns false if any component of `b` is false, true otherwise
* `not(b)` negates the logical value of the components of `b`

