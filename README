
#Timer.js gives you the tempo, you play the music!

Timer.js is a low-level solution from time-based script.  
Timer.js is made to unify all your time-based script in one and only optimize loop.  

## How it work?

Timer.js run on the **requestAnimationFrame** method that allow smooth animation,
by optimizing the rendering at browser level. See [http://www.html5rocks.com/en/tutorials/speed/html5/](http://www.html5rocks.com/en/tutorials/speed/html5/) and [http://paulirish.com/2011/requestanimationframe-for-smart-animating/](http://paulirish.com/2011/requestanimationframe-for-smart-animating/) for details.
In fact, this loop is very smart cause she adapts her "framerate" depending on the rendering execution time.
It's allways smooth.

## Show me code!

OK, but before a little focus:

The Timer.add() method is the core of Timer.js.
You simply register a function, setting fps, duration, delay.

            Timer.add(function, fps, duration, delay);
            // Timer will execute "function", "fps" times a seconds, for "duration" milliseconds after a delay of "delay" milliseconds

The method return an object containing everything you need to track the time

            TimerItem :
                {
                    start: Timestamp representing the beginning,
                    end: Timestamp representing the end, (start + duration), equals Infinity if no duration set
                    current: current timestamp,
                    fps: the maximum fps (the requestAnimationFrame will overload this to smoothness if needed),
                    interval: 1000/fps, give milliseconds
                    duration: number of millisecond, equals Infinity if not set,
                    delay: delay
                }

 Few easy examples:

        var  foo = function (now, pc){
            // now is the current timestamp
            // pc is the percentage of the animation already done, equals always 0 if no duration set.
        }

        Timer.add(foo); // will run foo with a fps

        Timer.add(foo, 25, 5000);
        // fps to 25, duration to 5 seconds

        Timer.add(foo, 25, 5000, 2000);
        // will wait 2 seconds before executing foo with fps to 25 and for a duration of 5 seconds

For easier stuff, you can use

        Timer.delay(foo, 2000);
        // will wait 2 seconds to execute foo

        Timer.each(foo, 2000);
        // will execute one time foo every 2 seconds

You can remove a TimerItem from the loop, and reinject a TimerItem into the loop

        var X = Timer.add(baz);

        // later...
        Timer.remove(X);
        // will stop the execution of foo

        // a little bit more later
        Timer.add(X);


## Suggest, clue, bugs ?
Please fork it or contact me !
