function a(massage) {
	alert(massage);
}


let cube = ((a,b) => a**b)


let avg2 = ((a,b) => (a+b)/2);


function sum3() {
	let sum = 0
	for (let i = 0; i < arguments.length; i++) {
		sum += arguments[i];
	}
	return sum;
}


function intRandom(a,b){
	if (b === undefined){
		b = a;
		a = 0;
	}
	if (a < 0 && b < 0) {
		return -1;
	}
	if (a === 0 && b === 1) {
		return Math.round(Math.random());
	}
	return (Math.random()*(b - a)) + a;
}



function greetAll(...params) {
	for (let value of params){
		console.log('Hello ' + value);
	}
}



function sum() {
	let sumReturn = 0;
	for (let i = 0; i < arguments.length; i++) {
		sumReturn += arguments[i];
	}
	return sumReturn;
}






let startHW;
for (let i = 0; i < 1; i++){
    startHW = prompt(`Введите номер задания (только цыфру):
1)  a
2)  cube
3)  avg2 
4)	sum3
5)	intRandom
6)	greetAll
7)	sum
`, '');

    if (isNaN(startHW) || +startHW < 1 || +startHW > 7 || startHW == ''){
        i--;
        alert('Введите число с предложенных варипнтов');
    }
}
switch (+startHW){
    case 1: a('Hello word !!!');
        break;
    case 2: console.log(cube(4,3));
        break;
    case 3: console.log(avg2 (4,3));
		break;
	case 4: console.log(sum3(1,2,100,100));
        break;
    case 5: console.log(intRandom(1,100));
        break;
    case 6: greetAll("Superman", "SpiderMan", "Captain Obvious", "Tom", "Jery");
		break;
	case 7: console.log(sum(2,7,8));
        break;
    default: alert('Error!');
        break;
}
