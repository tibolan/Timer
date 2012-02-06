/*!
 * Timer provides a low-level loop solution
 * it's use the requestAnimationFrame if supported, else fallback to a setInterval method (inspired by paul Irish polyfill)
 * Timer got a mechanism to stop the loop when no need, and start when needed.
 *
 * 6 methods:
 *      --> control the loop by yourself if needed
 *      start(): launch loop
 *      stop(): stop loop
 *      toggle(): toggle loop state
 *
 *       --> register/unregister callbacks to Timer
 *      add(callback, fps, duration, delay): add a 'callback' to be executed 'fps' (default 12) time a second for 'duration' (default Infinity) after 'delay' (default 0)
 *
 *          This method return a TimerItem. If you want to control your callback (remove), assign it to a variable
 *
 *          Timer.add(callback, 10) // will be executed 10 times by second until you remove it manually (see remove)
 *          Timer.add(callback, 10, 3) // will be executed 10 times by second for 3 seconds
 *          Timer.add(callback, 10, 3, 5) will be executed 10 times by second for 3 seconds after 5 seconds
 *
 *          Timer.add(TimerItem) // will be hooked to the Timer again with same params
 *
 *          return a TimerItem
 *
 *      remove(TimerItem):remove the TimerItem from the callback list, stop all animation
 *
 *      delay: add a callback to execute 1 time after x delay
 *      Timer.delay(callback, 10) callback will be execute after 10 seconds
 */

var Timer = (function () {


    var Engine = (function (){

        var interval = null;
        var PAUSED = true

        window.requestAnimFrame = (function(){
              return  window.requestAnimationFrame       ||
                      window.webkitRequestAnimationFrame ||
                      window.mozRequestAnimationFrame    ||
                      window.oRequestAnimationFrame      ||
                      window.msRequestAnimationFrame     ||
                      false
        })();

        return {
            start: function (){
                if(!PAUSED) return;
                PAUSED = false;
                if(!window.requestAnimFrame){
                    interval = setInterval(function (){
                        loop();
                    }, 25)
                }
                else {
                    loop();
                }
            },
            stop: function (){
                PAUSED = true;
                if(!window.requestAnimFrame){
                    clearInterval(interval)
                }
            },

            loop: function (){
                if(!PAUSED && window.requestAnimFrame) {
                    window.requestAnimFrame(loop);
                }
            },

            isRunning: function (){
                return !PAUSED;
            }
        }
    })();




    var TIME = 0,
        CB = [];

    function loop(time) {
        TIME = time || (new Date()).getTime();
        for (var i = 0, l = CB.length, o; i < l; i++) {
            o = CB[i];
            if (o && o.start <= TIME && (TIME - o.last >= o.interval)) {
                // si o existe
                // et si le startTime est inferieur à maintenant
                // et si l'interval est respecte
                if(o.end <= TIME){
                    o.callback(o.end);
                    Timer.remove(o);
                }
                else {
                    o.callback(TIME);
                    o.last = TIME;
                }
            }

        }

        if (Engine.isRunning() && CB.length) {
            Engine.loop();
        }
        else {
            Timer.stop();
        }
    }

    function getUid () {
        return "" + (TIME || (new Date).getTime()) + "-" + parseInt(Math.random() * 1000000);
    }

    return {

        start: function () {
            Engine.start();
        },

        stop: function () {
            Engine.stop();
        },

        toggle: function () {
            (!Engine.isRunning()) ? Timer.start() : Timer.stop();
        },

        add: function (fn, fps, duration, delay) {
            if(arguments.length == 1 && typeof fn  != "function"){
                fps = fn.fps;
                duration = fn.duration;
                delay = fn.delay;
                fn = fn.callback;
            }




            fps = (fps && fps > 60) ? 60 : (typeof fps == "undefined") ? 25 : fps;
            duration =  (duration) ? duration : Infinity;
            delay =  (delay) ? delay : 0;

            var startTime = ((new Date).getTime()) + delay;
            var endTime = startTime + duration;
            var interval = 1000 / fps;
            var o = {
                callback: fn,
                start: startTime ,
                end: endTime,
                interval: interval,

                last: -Infinity,

                fps: fps,
                duration: duration,
                delay: delay,

                uid: getUid()
            };
            console.log(o);
            CB.push(o);
            if(!Engine.isRunning()) {
                Timer.start();
            }
            return o;
        },


        each: function (interval, fn){
            return Timer.add(fn, 1/(interval/1000), Infinity, 0);
        },


        delay: function (fn, duration){
            return Timer.add(fn, 1, 1, duration);
        },

        clear: function (){
            CB = [];
        },

        getCB: function (){
            return CB;
        },

        remove: function (o){
            for (var i = 0, cb, l = CB.length; i < l; i++) {
                cb = CB[i];
                if(cb && cb.uid == o.uid){
                    CB.splice(i, 1);
                }
            }
        },

		isRunning: function (){
			return Engine.isRunning();
		}
    }
})();


