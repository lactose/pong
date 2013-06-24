=== Introduction to HTML Canvas Element ===

The canvas element is an element available to us since HTML5's release. It is currently supported in all modern browsers and Internet Explorer starting with version 9.

Anything found between the canvas start and close tags will be rendered in any browser that does not support the canvas element.

Supported browsers will ignore the fallback content.
```
<canvas id="canvas" height="500" width="500">Fallback content.</canvas>
```

To display canvas content, you must capture the rendering context via javascript. There are a couple of rendering contexts but
we'll be using 2d context.

```
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
```

Once you have a rendering context, you can use it to draw shapes and things.

```
// This will render a black rectangle at coordinates (10, 10)
// with a width of 60 pixels and a height of 30 pixels

ctx.fillRect(10, 10, 60, 30);
```

If you want to change the color of a shape you are about to draw, you can do so with fillStyle.
```
// Draws a red rectangle

ctx.fillStyle = 'rgb(200, 0, 0)';
ctx.fillRect(10, 10, 60, 30);
```

Naturally you'll want to see some movement. You can move the shapes around by combining some of these functions
with the data stored in variables, and setting an interval for repeating the draw.

```
var draw = function () {
    var x = 10,
        y = 10,
        velocity = 1;
    setInterval(function () {
        // clear the drawings and re-draw with updated coordinates
        ctx.clearRect(0, 0, 500, 500);
        x += velocity;
        y += velocity;
        ctx.fillRect(x, y, 60, 30);
    }, 1);
};
```

You can also incorporate images into a canvas element. The only trick here is that you can't try to draw an image before it's done
loading, or it'll throw an error. Other than that it's pretty simple.

```
var image = new Image(),
    ready = false;
image.src = "/path/to/image";

image.onload = function () {
    ready = true;
};

if (ready) {
    ctx.drawImage(image, 10, 10);
}
```

We can make a script that draws a simple ball that appears to bounce off of the "walls" of the canvas.

```
var x = 20,
    y = 20,
    xVelocity = 1,
    yVelocity = 1;

function ball(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

function update () {
    ctx.clearRect(0, 0, 500, 500);
    if (x > 500 || x < 0) { xVelocity = -xVelocity; }
    if (y > 500 || y < 0) { yVelocity = -yVelocity; }
    x += xVelocity;
    y += yVelocity;
    ball(x, y, 10);
}

setInterval(function () {
    update();
});
```

From there it's easy to image how we might add another rectangle to act as the paddle, and create a simple version of the classic Pong.

There a ton of different ways you can draw shapes. The 2d context has functions for opacity, shadows, stroke/outline, etc. You can draw
custom shapes by combining lines and curves.

Learn more at: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Canvas_tutorial/Drawing_shapes

Demos:

Pong: https://lactose.github.com/pong
Images: https://lactose.github.com/pong/alt.html
