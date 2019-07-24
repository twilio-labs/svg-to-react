# Rationale

There are different strategies for how to use icons in the web.  This outlines our rationale for 
why we prefer to use SVG icons embedded in React components.

## Approach 1: Icon fonts

Example: `<i class="icon-font check-icon" />`

### Pros:
- Works well on really old Internet Explorer versions (IE8 and older)
- Easy to bundle and use in a pre-react era

### Cons
- Bad accessibility
- Inflexible.  You can only change an icon's primary color and size.
- Load.  Font files add a lot of overhead because you load the whole thing rather than only the icons you need for that webpage visitor.
- Any single icon change requires re-building the font files and versioning.  This _can_ theoretically cause multiple versions of the font file to be loaded on a single page.
- Can't use the full power of SVG for animations.


## Approach 2: SVG as images

Example: `<img src={require('../assets/check-icon.svg')} />`

### Pros:
- Full power of the SVG spec for animations.
- Load.  You only require and load what you need.

### Cons:
- Accessibility is still tricky
- Inflexible.  You can only change the size.  Color must be pre-defined in the SVG file.  
- Load. Can cause duplicate SVG files just for a simple color swap.
- Need to modify webpack loaders to handle `.svg` files.


## Approach 3: SVG as React Component

Example: `<CheckIcon color="red" size="24" />`

### Pros:
- Full power of the SVG spec for animations.
- Good accessibility with a simple API.
- Easy to use; no Webpack changes to handle `svg` files.
- Flexible.  Can customize the size as well as multiple colors for a single SVG via props.
- Easy to theme.  Colors come from props.
- Load.  Easy to lazy load and you only use what you need.
- Conventions. Uses known React conventions to reduce complexity.

### Cons:
- React only.

# A note on performance

Embedding a bunch of SVGs into the page isn't perceivably slower than image tags.  In terms of rendering speed, if we load 100 of these SVGs on a single page (an unlikely and extreme scenario), the data is as follows:

- The image approach takes ~5ms to render.
- The SVG with props approach takes ~7ms to render.
[Please see this benchmark](https://github.com/TheSisb/svg-stress-test). 

In terms of asset loading time, 'SVG as images' and 'SVG as React components' are far more suitable than a font file.  They 
remove the need to maintain which icons exist in your project because only the used icons are bundled.  Further, if you use lazy loading for your icons, the gains are even greater to your initial bundle size.