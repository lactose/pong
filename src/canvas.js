var Canvas = (function () {

    return {
        init: function (id, options) {
            this.scope = document.getElementById(id);
            this.canvas = document.createElement("canvas");
            this.canvas.width = 550;
            this.canvas.height = 400;
            this.scope.appendChild(this.canvas);
            this.ctx = this.canvas.getContext("2d");
            this.keysDown = {};
            this.setupEntities();
            this.bindKeyEvents();
        },
        setupEntities: function () {
            var bgImage = Object.create(Entity),
                hero = Object.create(Entity);

            bgImage.init("images/bg.png");
            hero.init("images/hero.png", 200, 300);
            this.entities.push(bgImage);
            this.entities.push(hero);
            this.hero = hero;
        },
        bindKeyEvents: function () {
            var that = this;
            addEventListener("keydown", function (e) {
                that.keysDown[e.keyCode] = true;
            }, false);

            addEventListener("keyup", function (e) {
                delete that.keysDown[e.keyCode];
            }, false);
        },
        entities: [],
        render: function () {
            var that = this;
            _.each(that.entities, function (entity) {
                if (entity.ready) {
                    that.ctx.drawImage(entity.image, entity.x, entity.y);
                }
            });
            return 42;
        },
        update: function (modifier) {
            // the modifier value is calculated based on the time elapsed between each reading
            // of the key being down, this basically just ensures that the speed will remain
            // the same in the case that the browser is running very slowly.
            // taken from: https://github.com/lostdecade/simple_canvas_game
            if (37 in this.keysDown) {
                this.hero.x -= 256 * modifier;
            }
            if (39 in this.keysDown) {
                this.hero.x += 256 * modifier;
            }
        },
        start: function () {
            var then = Date.now(),
                that = this;
            setInterval(function () {
                var now = Date.now();
                var delta = now - then;

                that.update(delta / 1000);
                that.render();

                then = now;
            }, 1);
        }
    };

}());

var module = module || {};
module.exports = Canvas;
