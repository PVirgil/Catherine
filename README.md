# CATHERINE // ARTISTRY

> **How far can CSS go?**

**CATHERINE // ARTISTRY** is an interactive web experiment built to explore that question.

Rather than treating CSS as a layer for styling a conventional website, this project treats it as a **visual medium**.

3D space, procedural light, motion systems, glass-like materials, oversized typography, perspective, depth, and pointer-reactive effects are combined into a single interactive exhibition — with **no WebGL and no canvas**.

The result is part website, part digital artwork, and part CSS playground.

---

## The Idea

CSS is usually introduced through layouts, colors, buttons, cards, and responsive design.

Modern CSS is capable of considerably more.

CATHERINE // ARTISTRY explores what happens when properties normally used independently are combined into larger visual systems.

```css
transform
perspective
transform-style
radial-gradient()
conic-gradient()
filter
backdrop-filter
mix-blend-mode
-webkit-text-stroke
calc()
clamp()
var()
```

None of these techniques are particularly extraordinary on their own.

The interesting part is what happens when they begin interacting.

A pointer position can influence perspective.

Perspective can influence depth.

Depth can influence perceived lighting.

Gradients can become materials.

Typography can become geometry.

And ordinary DOM elements can begin to feel like objects existing in physical space.

---

# The Exhibition

The experience is divided into a series of experiments.

## 01 / LIGHT

### Paint with gradients, masks and blur.

The first experiment explores procedural surfaces.

Instead of using a rendered background image, the visual is constructed from layered CSS gradients:

```css
background:
  radial-gradient(...),
  radial-gradient(...),
  radial-gradient(...),
  conic-gradient(...);
```

Those layers are then combined with filtering, saturation, movement, and pointer interaction.

The result resembles a luminous material or abstract light field despite being generated entirely by the browser.

### Concepts demonstrated

* `radial-gradient()`
* `conic-gradient()`
* layered backgrounds
* `filter`
* `blur()`
* `saturate()`
* `color-mix()`
* CSS custom properties
* pointer-driven transforms

---

## 02 / SPACE

### Turn flat DOM into architecture.

HTML elements normally exist on a two-dimensional page.

CSS transforms allow them to occupy something that behaves much more like three-dimensional space.

The cube experiment uses six ordinary elements:

```html
<div class="face front"></div>
<div class="face back"></div>
<div class="face right"></div>
<div class="face left"></div>
<div class="face top"></div>
<div class="face bottom"></div>
```

Each face is positioned using transforms such as:

```css
.front {
  transform: rotateY(0deg) translateZ(110px);
}

.right {
  transform: rotateY(90deg) translateZ(110px);
}

.top {
  transform: rotateX(90deg) translateZ(110px);
}
```

The parent preserves the three-dimensional relationship between those elements:

```css
transform-style: preserve-3d;
```

And the scene provides perspective:

```css
perspective: 1100px;
```

Together, six flat DOM elements become a rotating object with apparent depth.

### Concepts demonstrated

* `perspective`
* `translateZ()`
* `rotateX()`
* `rotateY()`
* `transform-style: preserve-3d`
* nested transforms
* CSS animation
* pointer-controlled perspective

---

## 03 / MOTION

### Animate systems, not decorations.

One of the central ideas behind CSS // LIMITS is that interaction does not need to control individual animations.

Instead, JavaScript provides a small amount of information about the user:

```css
--mx
--my
--rx
--ry
```

Those values become inputs for the entire visual system.

For example:

```css
transform:
  translate(
    calc((var(--mx) - 50vw) * .12),
    calc((var(--my) - 50vh) * .12)
  );
```

The same pointer position can simultaneously influence:

* rotation
* translation
* perspective
* lighting
* distortion
* depth
* gradient position

JavaScript supplies the coordinates.

CSS decides what those coordinates mean visually.

This separation is one of the core principles behind the project.

---

# 04 / TYPE

### Typography becomes an object.

Typography does not have to remain static.

Large type throughout the exhibition responds to interaction using combinations of translation, skewing, scaling, outlines, and extreme letter spacing.

For example:

```css
.type-line {
  transform:
    translateX(
      calc((var(--mx) - 50vw) * .035)
    )
    skewX(
      calc(var(--rx) * .08)
    );
}
```

Some typography is rendered as outlined geometry using:

```css
-webkit-text-stroke
```

This creates enormous hollow letterforms that behave more like graphic shapes than conventional text.

### Concepts demonstrated

* responsive typography
* `clamp()`
* `scaleX()`
* `skewX()`
* `translateX()`
* text strokes
* extreme letter spacing
* typography as visual geometry

---

# 05 / IMPOSSIBLE

### Interfaces that refuse to stay flat.

The final interactive cards combine several techniques used throughout the exhibition.

Cards exist inside perspective space:

```css
transform:
  perspective(900px)
  rotateX(...)
  rotateY(...);
```

Their contents are then pushed forward:

```css
transform: translateZ(24px);
```

This creates separation between the card and its contents.

Other cards introduce translucent materials:

```css
backdrop-filter: blur(16px) saturate(2);
```

while procedural gradients create iridescent surfaces.

### Concepts demonstrated

* 3D cards
* pointer parallax
* glassmorphism
* `backdrop-filter`
* `translateZ()`
* conic gradients
* synthetic materials
* layered depth

---

# 06 / THE LIMIT

The exhibition eventually arrives at the question behind the entire project:

> **THE LIMIT WASN'T CSS.
> IT WAS THE IDEA.**

CSS has technical limitations.

But many things that initially appear to require rendered graphics, animation libraries, or 3D engines can be approximated surprisingly well with native browser primitives.

The project is an experiment in finding that boundary.

---

# CSS POWER

One control ties the entire exhibition together:

**CSS POWER**

Instead of independently disabling effects, the interface modifies a global CSS custom property:

```css
--power: 1;
```

Individual systems reference that variable:

```css
opacity: calc(.22 * var(--power));
```

or:

```css
rotateX(
  calc(var(--ry) * .06 * var(--power))
);
```

or even animation duration:

```css
animation:
  orbitA
  calc(12s / max(var(--power), .1))
  linear infinite;
```

Reducing CSS POWER therefore changes the behavior of the entire visual system.

At high power, the page becomes an interactive digital artwork.

At lower power, the underlying interface begins to reveal itself.

This demonstrates one of the most powerful ideas behind CSS custom properties:

**variables can control systems rather than individual styles.**

---

# VIEW THE CSS

The site includes a built-in source viewer.

Selecting **VIEW THE CSS** reveals examples of the CSS responsible for the experiment currently visible on screen.

This was intentionally included because CATHERINE // ARTISTRY is not meant to hide its tricks.

The visual effect is only half of the project.

Understanding how the browser creates it is the other half.

---

# Minimal JavaScript

Despite the amount of movement on screen, JavaScript has deliberately been kept small.

Its primary job is to observe pointer movement:

```javascript
window.addEventListener("pointermove", e => {
  // calculate pointer position
});
```

and expose that information to CSS:

```javascript
root.style.setProperty("--mx", `${x}px`);
root.style.setProperty("--my", `${y}px`);
root.style.setProperty("--rx", `${rotationX}deg`);
root.style.setProperty("--ry", `${rotationY}deg`);
```

After that, CSS takes over.

This architecture keeps a clear distinction:

**JavaScript provides state.**

**CSS provides the visual interpretation of that state.**

---

# No WebGL. No Canvas.

One of the most important constraints of the project is what it **doesn't** use.

There is no:

* Three.js
* WebGL renderer
* `<canvas>` rendering pipeline
* 3D model
* animation framework
* shader system
* large JavaScript visual library

That constraint is intentional.

Using a dedicated graphics engine could produce significantly more sophisticated 3D imagery.

But that would answer a different question.

CATHERINE // ARTISTRY asks:

> **How much visual complexity can we extract from the browser's native styling system?**

---

# Progressive Enhancement

The experience is designed around modern browsers while still respecting user preferences.

For visitors who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

This dramatically reduces continuous animation while preserving the structure and visual identity of the site.

---

# What This Project Demonstrates

CATHERINE // ARTISTRY is ultimately an experiment in combining relatively simple browser primitives.

The most important techniques include:

| Technique             | Purpose                              |
| --------------------- | ------------------------------------ |
| CSS Custom Properties | Global interaction state             |
| `calc()`              | Dynamic relationships between values |
| `clamp()`             | Fluid responsive scaling             |
| `perspective`         | Simulated depth                      |
| `preserve-3d`         | Three-dimensional DOM structures     |
| `translateZ()`        | Layer separation                     |
| Gradients             | Procedural imagery                   |
| `color-mix()`         | Dynamic color construction           |
| Filters               | Light and material effects           |
| `backdrop-filter`     | Glass-like surfaces                  |
| Text Stroke           | Outlined typography                  |
| Blend Modes           | Optical color interactions           |
| CSS Animations        | Continuous motion                    |
| Media Queries         | Responsive behavior                  |
| Reduced Motion        | Accessibility                        |

The larger lesson is that the power does not necessarily come from any single property.

It comes from **composition**.

---

# Project Structure

The project intentionally remains small.

```text
CSS-LIMITS/
│
├── index.html
├── styles.css
├── script.js
├── netlify.toml
├── README.md
└── LICENSE
```

### `index.html`

Contains the semantic structure of the exhibition.

### `styles.css`

Contains the overwhelming majority of the visual system: layout, typography, procedural imagery, materials, 3D transforms, animation, responsive behavior, and interaction responses.

### `script.js`

Handles the small amount of state CSS cannot obtain directly, primarily pointer coordinates and interface controls.

---

# Experiment With It

This project is designed to be modified.

Try changing:

```css
--accent-a
--accent-b
--accent-c
```

Try increasing perspective.

Change `translateZ()` distances.

Replace radial gradients with conic gradients.

Make pointer movement control blur instead of rotation.

Make scroll position control color.

Connect one custom property to five completely unrelated effects.

Break things.

Then figure out why they broke.

Some of the most interesting CSS techniques are discovered by pushing properties far beyond the values normally used in production interfaces.

---

# A Different Way to Think About CSS

CSS is often treated as the final step of web development:

**HTML → JavaScript → styling**

This project approaches it differently.

CSS can be a rendering system.

CSS can be an animation system.

CSS can describe depth.

CSS can generate imagery.

CSS can respond to state.

CSS can create materials.

CSS can create illusions.

And sometimes, a `<div>` doesn't have to look like a `<div>`.

---

## `{ }`

**CATHERINE // ARTISTRY**

*An experiment in discovering where the browser stops — and imagination begins.*
