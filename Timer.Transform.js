// NOTHING INTERESTING YET HERE

/*
 *  o [
 *       {from, to, prop, ease, fps}
 *  ]
 *
 * */

Timer.transform = (function () {
    Math.easeOutQuad = function (t, b, c, d) {
    }

    function compute(t,b,c,d,a,p) {



        if ((t/=d) < (1/2.75)) {
        		return c*(7.5625*t*t) + b;
        	} else if (t < (2/2.75)) {
        		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        	} else if (t < (2.5/2.75)) {
        		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        	} else {
        		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        	}




        return c*t/d + b;
    }

    return {
        start:function (o) {
            this.options = o;
            this.timer = Timer.add((function (self) {
                return function (now, delta, o) {
                    self._apply(now, delta, o);
                }
            })(this), this.options.fps, this.options.duration, this.options.delay);
        },
        stop:function () {
            Timer.remove(this.timer);
        },

        _apply:function (now, delta,o) {
            var t = o.duration*delta;
            var b = this.options.from;
            var c = (this.options.to-this.options.from);
            var d = o.duration;


            this.options.callback.apply(this, [compute(t,b,c,d), delta]);
        }
    }
})();

var I = 0;
var Bulle = document.querySelector("#bulle");
Timer.transform.start({
    from:0,
    to:100,
    duration:2500,
    delay:300,
    fps:100,
    callback:function (value,delta) {
        drawGraph(value, delta, 100);
        Bulle.style.left = value + "%";
        console.log(value,delta)


    }

})


var drawGraph = (function () {

    var canvas = document.getElementById("graph"), ctx = canvas.getContext("2d");
    var points = [];


    return function (value, delta, fps) {

            ctx.beginPath();
            ctx.save();
            ctx.fillStyle = "red";
            ctx.fillRect(delta * 1200, 600-value, 1, 1);
            ctx.restore();




        ctx.fill();

    }
})()