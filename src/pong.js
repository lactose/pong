var Pong = (function () {

    var module = {
        init: function (id) {
            this.scope = document.getElementById(id);
            this.canvas = document.createElement("canvas");
            this.canvas.width = this.WIDTH = 550;
            this.canvas.height = this.HEIGHT = 400;
            this.scope.appendChild(this.canvas);
            this.ctx = this.canvas.getContext("2d");
            this.ball = { x: 50, y: 50, radius: 10, xVelocity: 256, yVelocity: 256 };
            this.paddle = { x: 250, y: 390, w: 75, h: 10, xVelocity: 512, yVelocity: 512 };
            this.keysDown = {};
        },
        drawBall: function (ball) {
            var ctx = this.ctx;

            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();
        },
        drawPaddle: function (paddle) {
            var ctx = this.ctx;

            ctx.beginPath();
            ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
            ctx.closePath();
            ctx.fill();
        },
        keyEvents: function () {
            var that = this;
            addEventListener("keydown", function (e) {
                that.keysDown[e.keyCode] = true;
            }, false);
            addEventListener("keyup", function (e) {
                delete that.keysDown[e.keyCode];
            }, false);
        },
        clear: function () {
            this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        },
        update: function (modifier) {
            var ball = this.ball,
                paddle = this.paddle;

            if (ball.x > (this.WIDTH - 10) || ball.x <= 10) {
                ball.xVelocity = -(ball.xVelocity);
            }
            if (ball.y <= 10) {
                ball.yVelocity = -(ball.yVelocity);
            }
            if ((ball.y + ball.yVelocity * modifier) >= (this.HEIGHT - paddle.h) && ball.y < this.HEIGHT && ball.x >= paddle.x && ball.x <= (paddle.x + paddle.w)) {
                ball.yVelocity = -(ball.yVelocity);
            }
            ball.x += ball.xVelocity * modifier;
            ball.y += ball.yVelocity * modifier;

            if (paddle.x > 0 && this.keysDown.hasOwnProperty(37)) {
                paddle.x -= paddle.xVelocity * modifier;
            } else if (paddle.x < (this.WIDTH - paddle.w) && this.keysDown.hasOwnProperty(39)) {
                paddle.x += paddle.xVelocity * modifier;
            }
        },
        render: function () {
            this.clear();
            this.drawBall(this.ball);
            this.drawPaddle(this.paddle);
        },
        start: function () {
            var then = Date.now(),
                that = this;
            that.keyEvents();
            setInterval(function () {
                var now = Date.now(),
                    delta = now - then;

                that.update(delta / 1000);
                that.render();

                then = now;
            }, 1);
        }
    };
    return module;
}());
