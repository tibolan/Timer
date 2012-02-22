

/*
*  o [
*       {from, to, prop, ease, fps}
*  ]
*
* */

Timer.transform = (function (){

    function compute(from, to, delta){
        return (to - from) * delta + from;
    }

    function apply(time, delta){
//        console.log(this.applyTransfo(1,2))
    }



    return {
        start: function (o, fn){
            this.timer = Timer.add(apply);
        },
        stop: function (){
            Timer.remove(this.timer);
        },
        applyTransfo: function (prop, value){
            document.title = prop + " = " +value;
        }
    }
})();
