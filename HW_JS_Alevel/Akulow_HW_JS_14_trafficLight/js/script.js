let red = document.querySelector('.red'),
    yellow = document.querySelector('.yellow'),
    green = document.querySelector('.green'),
    btn = document.querySelector('#btn'),
    counter = document.querySelector('.counter');

let timeId, showCounterId, isFirstTimes = true;

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms));
let lessDelay = ms => new Promise(function(resolve){
        btn.onclick = () => {
            btnWasClicked();
            clearTimeout(timeId);
        }
        timeId = setTimeout(() => resolve(),ms);
        function btnWasClicked() {
            setTimeout(() => resolve(),3000);
        }
    });

let redTime = 5000,
    yellowTime = 2000,
    greenTime = 7000;

async function trafficLight(){
    while (true){
        
        showCounter(parseInt(redTime));
        yellow.classList.remove('yellow-active');
        red.classList.add('red-active');
        await delay(redTime);

        showCounter(parseInt(yellowTime));
        red.classList.remove('red-active');
        yellow.classList.add('yellow-active');
        await delay(yellowTime);

        showCounter(parseInt(greenTime));
        yellow.classList.remove('yellow-active');
        green.classList.add('green-active');
        await Promise.race([delay(greenTime), lessDelay(greenTime+1000)]);   
        
        clearTimeout(showCounterId);
        counter.innerText = parseInt(yellowTime/1000);

        showCounter(parseInt(yellowTime));
        green.classList.remove('green-active');
        yellow.classList.add('yellow-active');
        await delay(yellowTime);
    }
}
trafficLight();

function showCounter(time) {
    if (isFirstTimes){
        counter.innerText = time/1000;
        isFirstTimes = false
    }
    time -= 1000;
    if (time ==  0){
        isFirstTimes = true;
        return;
    }

    showCounterId = setTimeout(()=>{
        counter.innerText = time/1000;
        showCounter(time);
    },1000);
    
}


/////////////////////////////////////// S-P-E-E-D    T-E-S-T ///////////////////////////////////////////////////////


async function speedtest(getPromise, count=1,parallel=1){
    let parallel2 = parallel, obj = {}, forDur = 0;;
    function parallelStart() {

        if (parallel === 1) {
            parallel = parallel2;
            return(getPromise());
        } else {
            parallel--;
            parallelStart();
            return(getPromise());
        }

    }

    let start = performance.now();

    for(let i = 0; i < count; i++) {
        let a = performance.now();
        await Promise.all([parallelStart()]);
        forDur += performance.now() - a;
    }
    obj.amountParallel = parallel + '  паралельных процессов';
    obj.duration = performance.now() - start;
    obj.parallelDuration = forDur/count;
    obj.paralledSpeed = parallel / (forDur/count);
    obj.queryDuration = parseInt(obj.parallelDuration) + ' мили-секунд';
    obj.querySpeed = 'Не понял отличия от queryDuration';

    return obj;
}
speedtest(() => delay(1000), 10, 100 ).then(result => console.log(result));
speedtest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5).then(result => console.log(result));


