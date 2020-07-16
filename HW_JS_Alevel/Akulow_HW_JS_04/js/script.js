function exercise_1() {         // 1-2-3) 3 persons; different fields; fields check;
    let a, b, c;
    a = {
        name: '',
        sername: ''
    };
    b = Object.assign({}, a);
    c = Object.assign({}, a);
    a.age = '';
    b.fathername = '';
	c.sex = '';
	for (let key in a) {
		if (key === 'age' || key === 'fathername' || key === 'sex')
			alert(key);
	}
	for (let key in b) {
		if (key === 'age' || key === 'fathername' || key === 'sex')
			alert(key);
	}
	for (let key in c) {
		if (key === 'age' || key === 'fathername' || key === 'sex')
			alert(key);
	}
}

function exercise_2() {   // 4-5-6-7-8-9-10)  
	let persons =[{}, {}, {}];		//array of persons;
	for (let key of persons) {
		key.name = 'Вася';
		key.sername = 'Петренко';
	}
	for (let key of persons) {		//loop of persons; 
		console.log(key);
	}
	for (let key in persons) {		//loop of name and surname; 
		console.log(persons[key].name);
		console.log(persons[key].sername);
	}
	console.log('======================');
	persons.forEach(function(item){		// loop of loop of values;
		for (let key in item){
			console.log(item[key]);
		}
	});
	//delete persons[1].name;
	persons.forEach(function(item, index, mas){		// fullName;
		let counter = 0;
		for (let key in item){
			if (key === 'name' || key === 'sername')
			counter++;
		}
		if (counter >= 2) {
			item.fullname = 'Василий';
		}
	});
	console.log(persons);
	let json = JSON.stringify(persons);	//serialize; 
	console.log(json);

	let jsonReverse = '{"name":"Даша","sername":"Жабатинская"}'; //deserialize;
	jsonReverse = JSON.parse(jsonReverse);
	persons.push(jsonReverse);
	console.log(persons);

	var str = '<table border="1">';		// HTML; HTML optional fields; HTML tr color;
		for (let i = 0; i < persons.length; i++){
			str += '<tr style="background-color: red;">';
				for (let key in persons[i]){
					str += `<td>${persons[i][key]}</td>`;
				}
			str += '</tr>';
		}
	str += '</table>';
	document.write(str);
}



function exercise_3() {			// 3) Задание на синий пояс.
	let str = '',
		amountTables = 1;
		amountRowInTable = 4;
		amountColInTable = 5;
	for (let x = 0; x < amountTables; x++) {
		str = '<table border="1">';
		for (let y = 0; y < amountRowInTable; y++) {
			str += '<tr>';
			for (let z = 0; z < amountColInTable; z++){
				str += `<td>Item ${z+1}</td>`;
			}
			str += '</tr>';
		}
		str += '</table>';
	}
	document.write(str);
}

var uniqueInOrder=function(iterable){
	if (iterable === object)
	var arr = iterable.split('');
	for (let i = 0; i < arr.length; i++)
	if (arr[i] === arr[i+1]) {
		arr.splice((i+1), 1);
		i--;
	}
	return arr;
};
uniqueInOrder("heeeRRRRRllo");


let a =[1,2,3];
if (a === object){
	console.log('yes');
}

let startHW;
for (let i = 0; i < 1; i++){
    startHW = prompt(`Введите номер задания (только цыфру):
1)  3 persons;
    different fields;
    fields check;
2)  array of persons;
    loop of persons; 
    loop of name and surname;
    loop of loop of values;
    fullName;
    serialize; 
    deserialize;
    HTML; 
    HTML optional fields;
    HTML tr color;
3)  Задание на синий пояс. 

HTML th optional и Задание на черный пояс - 
не понял как сделать...()`, '');
    if (isNaN(startHW) || +startHW < 1 || +startHW > 3 || startHW == ''){
        i--;
        alert('Введите число с предложенных варипнтов');
    }
}
switch (+startHW){
    case 1: exercise_1();
        break;
    case 2: exercise_2();
        break;
    case 3: exercise_3();
        break;
    default: alert('Error!');
        break;
}
