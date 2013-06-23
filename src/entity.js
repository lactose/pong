var Entity = (function () {
    return {
        init: function (src, x, y) {
            var that = this;
            that.image = new Image();
            that.image.src = src;
            that.ready = false;
            that.x = x || 0;
            that.y = y || 0;
            that.image.onload = function () {
                that.ready = true;
            };
        }
    };
}());
