
function exercise_1(){
    var a = 5;               // 1)assign: evaluation   Убрал скобки, код работаетю
    var b, c;
    b = a * 5;  
    b = c = b/2;
    console.log(a);
    console.log(b);
    console.log(c);
}

function exercise_2_3(){                
    alert('ошибка без ; в записи: var a var b;');                // 2) assign: evaluation, Нет ';' - ошибка
    //var a var b;                                          //  3) semicolon: mistake    Не нашел такую                                                     
}


function exercise_4(){
    let a = parseInt(+prompt('Введите ваш возраст', ''));         // 4) Number: age Спросил возраст и сказал год рождения
    alert('Ваш год рождения : ' + (2020 - a) + 'год');
}


function exercise_5(){
    let choise, temp;                                            // 5) Number: temperature 
for(let i = 0; i < 1; i++){
    choise = prompt(`Ведите нужный вариант:
            1) Цельсий => Фаренгейт
            2) Фарингейт => Цельсий`);

    if (choise == 1) {
        temp = +prompt('Введите температуру в Цельсиях');
        alert(`Температура в Фаренгейтах: ${(temp * (9 / 5) + 32)} °`);
    } else if (choise == 2) {
        temp = +prompt('Введите температуру в Фаренгейтах');
        alert(`Температура в Цельсиях: ${(temp - 32) * (5 / 9)} °`);
    } else {
        i--;
        alert('Введите просто цыфру!');
    }
}


}
function exercise_6(){
    alert('Вам нужно будет ввести 2 числа для деления');             // 6) Number: divide
    let a = +prompt('Введите первое число');
    let b = +prompt('Введите второе число');
    alert(Math.round(a / b));
}


function exercise_7(){
    for(let i = 0; i < 1; i ++){                                       // 7)  Number: odd Проверить число, или нет
        let num = +prompt('Введите число', '');
        if( !isNaN(num) && typeof(num) != 'object' && num != ''){
            alert('Все верно!');
        } else {
            i--;
            alert('Введите просто цыфру!');
        }
    }
}


function exercise_8(){
    let name = prompt('Введите ваше имя', '');                    // 8) String: greeting   Спросить имя и вывести
    alert('Здравствуйте ' + name);
}
function exercise_9(){
    let badWord = prompt('Enter sentence', '');                   // 9) String: lexics Проверка плохого слова
    if((badWord.indexOf('fuck')) == -1){
        alert("Ok");
    } else {
        alert('You use bad words');
    }
}


function exercise_10(){
    let conf = confirm('Do you sportsman ?');             // 10)  confirm  Тип - Bollean. Значения: true, false
}


function exercise_11_12(){
    let confirmAge = confirm('Вам есть 18?');           // 11) Boolean
    let confirmGender = confirm('Вы мальчик?');         // 12) Boolean: if
    if(confirmGender == true){
        alert('Поздравляю вы мальчик');
    } else {
        alert('Поздравляю вы девочка');
    }
}


function exercise_13(){
    let sessionMarks = [4, 5, 4, 4, 5, 5, 4, 5, 4, 4];                    // 13) Array: real
    let toDoList = [1, 2, 3, 4, 5, 6, 7];
    let availableColors = ['red', 'blue','green', 'black', 'white'];
    console.log(availableColors); 
}


function exercise_14(){
    let arrBoolean = [true, false, true, true];   
    console.log(arrBoolean);                        // 14) Array: booleans
}


function exercise_15(){
    let arrPlus = [5, 20, 40, 1, 7];                 // 15)  Array: plus   результат: [ 5, 20, 25, 1, 7 ]
    arrPlus[2] = arrPlus[0] + arrPlus[1];
    console.log(arrPlus);
}


function exercise_16(){
    let arrPlus = ['a', 'b', 'c', 'resault'];                     // 16) Array: plus string    результат: [ 'a', 'b', 'c', 'abc' ]
    arrPlus[3] = arrPlus[0] + arrPlus[1] + arrPlus[2];
    console.log(arrPlus);
}


function exercise_17_18(){
    let markerType = {                                                  // 17) Object: real    
        markerColor : ['black', 'red', 'yellow', 'green', 'blue'],      // 18) Object: change
        markerThickness : ['thin', 'medium', 'thick'],
        markerBilateral : [true, false]
    };
    console.log(markerType);
    markerType.markerBilateral[0] = 'yes';
    markerType.markerBilateral[1] = 'no';
    console.log(markerType);
}


function exercise_19(){
    var age = +prompt("Сколько вам лет?","");                           // 19) Comparison if Добавил минусовой возраст.
    if (age < 0) alert('Вы еще не родились?)');
    else if (age >= 0 && age <=5) alert('бебик');
    else if (age >5 && age <= 18) alert("школьник");
    else if (age > 18 && age <= 30) alert("молодеж");
    else if (age > 35 && age <= 45) alert("зрелость");
    else if (age > 45 && age <= 60) alert("закат");
    else if (age > 60) alert("как пенсия?");
    else alert("то ли киборг, то ли ошибка"); 
}


function exercise_20(){
    alert('Перевод размеров с Российских стандартов - в стандарты США');     // 20) Comparison: sizes  Перевод размеров одежды
    let choise;
    for (let i = 0; i < 1; i++){
        choise = prompt(`Введите нужный тип одежды:
            1) Верхняя одежда, платья и брюки
            2) Женское бельё
            3) чулки и носки`, '');
            if(isNaN(choise) || +choise < 1 || +choise > 3 || choise.length != 1 || choise == ''){
                i--;
                alert('Введите цыфру с предложенных вариантов');
            }
    }
    if (choise == 1){
        topClothes_Dress(+prompt(`Введите нужный вам размер:
                40; 42; 44; 46; 48; 50; 52; 54;`, ''));
    } else if (choise == 2) {
        lingerie(+prompt(`Введите нужный вам размер:
                42; 44; 46; 48; 50; 52; 54; 56;`, ''));
    } else socks_stockings(+prompt(`Введите нужный вам размер:
            21; 23; 25; 27;`, ''));

    function topClothes_Dress(size1){
        switch (size1) {
            case 40 : alert('Размер в США: 6, S');
                break;
            case 42 : alert('Размер в США: 8, M');
                break;
            case 44 : alert('Размер в США: 10');
                break;
            case 46 : alert('Размер в США: 12, L');
                break;
            case 48 : alert('Размер в США: 14');
                break;
            case 50 : alert('Размер в США: 16, XL');
                break;
            case 52 : alert('Размер в США: 18');
                break;
            case 54 : alert('Размер в США: 20, XXL');
                break;
            default: alert('Такого варианта нет (');
                break;
        }
    }
    function lingerie(size2){
        switch (size2){
            case 42 : alert('Размер в США: 8');
                break;
            case 44 : alert('Размер в США: 10');
                break;
            case 46 : alert('Размер в США: 12');
                break;
            case 48 : alert('Размер в США: 14');
                break;
            case 50 : alert('Размер в США: 16');
                break;
            case 52 : alert('Размер в США: 18');
                break;
            case 54 : alert('Размер в США: 20');
                break;
            case 56 : alert('Размер в США: 22');
                break;
            default: alert('Такого варианта нет (');
                break;
        }
    }
    function socks_stockings(size3){
        switch (size3) {
            case 21 : alert('Размер в США: 8');
                break;
            case 23 : alert('Размер в США: 9');
                break;
            case 25 : alert('Размер в США: 10');
                break;
            case 27 : alert('Размер в США: 11');
                break;
            default: alert('Такого варианта нет (');
                break;
        }
    }
}


function exercise_21(){
   console.log('коментарий в коде'); // 21) Comparison: object Я думаю можно было занести в объект: "Розмер в россии" : "Розмер в США"
}

function exercise_22(){
    confirm('Вы мужчина ?') ? alert('Значит вы мужчина') : alert('Значит вы женщина');  // 22) Ternary
}


function exercise_23(){
    alert('Расчёт этажа и подъезда по номеру квартиры');             //23) Синий пояс Number: flats
    let floors, flatPerFloor, enterence, amountFlats, flatsInEnterance, needFlat, answerEnterence, addArgument, answerFloor;  // Переменные

    for (let i = 0; i < 1; i++){        // Ввод начальных характеристик дома
        floors = +prompt('Введите количество этажей в доме', '');
        flatPerFloor = +prompt('Введите количество квартир на этаже', '');
        enterence = +prompt('Введите количество подъездов', '');
        if(floors == '' || floors < 1 || isNaN(floors) || flatPerFloor == '' || flatPerFloor < 1 || isNaN(flatPerFloor) || enterence == '' || enterence < 1 || isNaN(enterence)){
            i--;
            alert('Вводите только целые числа');
        }
    }
    amountFlats = floors * flatPerFloor * enterence;    // всего квартир в доме
    flatsInEnterance = floors * flatPerFloor;       //квартир в одном подъезде

    alert(`В вашем доме:
            Этажей: ${floors}
            Подъездов: ${enterence}
            Квартир: ${amountFlats}`);

    for (let i = 0; i < 1; i++) {       // номер запрашиваемой квартиры
        needFlat = +prompt(`Введите номер квартиры с диапазона:
        от 1 до ${amountFlats}`, '');
        if (isNaN(needFlat) || needFlat < 1 || needFlat == '' || needFlat > amountFlats){
            i--;
            alert('Введите только целое число с предложенного диапазона');
        }
    }
    answerEnterence = Math.ceil(needFlat / flatsInEnterance); // это подъезд нужной квартиры

    addArgument = needFlat; 

    addArgument = addArgument % flatsInEnterance;   // Это номер нужной квартиры, если считать от первого этажа
    if (addArgument == 0){
        addArgument = flatsInEnterance;
    }

    answerFloor = Math.ceil(addArgument / flatPerFloor); // Этаж нужной квартиры

    alert(`Характеристики квартиры № ${needFlat} :
                Подъезд № ${answerEnterence}
                Этаж № ${answerFloor}`);
}



let startHW;
for (let i = 0; i < 1; i++){
    startHW = prompt(`Введите номер задания (только цыфру):
            1) assign: evaluation
            2) assign: evaluation
            3) semicolon: mistake
            4) Number: age
            5) Number: temperature
            6) Number: divide
            7) Number: odd
            8) String: greeting
            9) String: lexics
            10) confirm
            11) Boolean
            12) Boolean: if
            14) Array: real
            14) Array: booleans
            15) Array: plus
            16) Array: plus string 
            17) Object: real
            18) Object: change
            19) Comparison if
            20) Comparison sizes
            21) Comparison: object
            22) Ternary
            23) Синий пояс Number: flats`, '');
    if (isNaN(startHW) || +startHW < 1 || +startHW > 23 || startHW == ''){
        i--;
        alert('Введите число с предложенных варипнтов');
    }
}
switch (+startHW){
    case 1: exercise_1();
        break;
    case 2:
    case 3: exercise_2_3();
        break;
    case 4: exercise_4();
        break;
    case 5: exercise_5();
        break;
    case 6: exercise_6();
        break;
    case 7: exercise_7();
        break;
    case 8: exercise_8();
        break;
    case 9: exercise_9();
        break;
    case 10: exercise_10();
        break;
    case 11:
    case 12: exercise_11_12();
        break;
    case 13: exercise_13();
        break;
    case 14: exercise_14();
        break;
    case 15: exercise_15();
        break;
    case 16: exercise_16();
        break;
    case 17:
    case 18: exercise_17_18();
        break;
    case 19: exercise_19();
        break;
    case 20: exercise_20();
        break;
    case 21: exercise_21();
        break;
    case 22: exercise_22();
        break;
    case 23: exercise_23();
        break;
    default: alert('Error!');
        break;
}
