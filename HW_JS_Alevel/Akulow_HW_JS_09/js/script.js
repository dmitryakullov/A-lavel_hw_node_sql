
function makeProfileTimer() {
    let time = performance.now();
    
    for (let i = 0; i < 100000000; i++){
        let a = 37**195;
    }

    return performance.now() - time;
}
var timer = makeProfileTimer();
alert(timer + '  Мили-секунд');



let a = '';
function makeSaver(num) {
    if (a === '') {
        a = num();
        return function() {
            return a;
        };
    } else 
        return function() {
            return a;
        };
}
let saver = makeSaver(Math.random);

var value1 = saver();
var value2 = saver();
console.log(value1, value2);

//var saver2 = makeSaver(() => console.log('saved function called') || [null, undefined, false, '', 0, Math.random()][Math.ceil(Math.random()*6)])
// Не понимаю что это, и что тут происходит ↑↑↑;



let counter = 0;
let timeId = setInterval(() => {
    counter++;
    if (counter === 60) {
        console.log('60 second have passed\nCounting stopped');
        clearInterval(timeId);
    } else 
        console.log(counter);
}, 1000);





// All are work ↓↓↓
function myBind(powX, mathX, [n1, num2,n3,num4,n5,num6,n7,num8]) {
    function innerFunc(n11,n33,n55,n77) {
        return powX.apply(mathX,[n11,num2,n33,num4,n55,num6,n77,num8]);
    }
    return innerFunc;
}
var pow5 = myBind(Math.pow, Math, [undefined, 5]);
var cube = myBind(Math.pow, Math, [undefined, 3]);

var chessMin = myBind(Math.min, Math, [undefined, 4, undefined, 5,undefined, 8,undefined, 9]);

console.log(pow5(2));   
console.log(cube(3));

console.log(chessMin(-1,-5,3,15));

var zeroPrompt = myBind(prompt, window, [undefined, "0"]);

var someNumber = zeroPrompt("Введите число");
console.log(someNumber);