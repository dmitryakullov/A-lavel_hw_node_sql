function exercise_1() {                                 // 1) switch: sizes
    alert('В прошлом задании, я писал через switch');    
}


function exercise_2() {                                  // 2) switch: if
    var color = prompt("Введите цвет","");
    if (color == "red" || color == "black") {
        document.write("<div style='background-color: red;'>красный</div>");
        document.write("<div style='background-color: black; color: white;'>черный</div>");
    } else if (color == "blue" || color == "green") {
        document.write("<div style='background-color: blue;'>синий</div>");
        document.write("<div style='background-color: green;'>зеленый</div>");
    } else 
        document.write("<div style='background-color: gray;'>Я не понял</div>");   
}



function exercise_3() {                                    // 3) Number: age 
    let a = parseInt(+prompt('Введите ваш возраст', ''));   
        if (a == '' || a < 0 || a == null || isNaN(a)) {
            alert('Неправильный ввод данных');
        } else
            alert('Ваш год рождения : ' + (2020 - a) + 'год');
}


function exercise_4() {                                 // 4)   confirm: or this days
    confirm('Капризный робот:\nШопинг?') ? alert('Отлично !') : alert('Бяка !');  
}



function exercise_5() {                                          // 5) confirm: if this days
    let question = confirm('Капризный робот: \n Шопинг?');
    if (question == true) {
        alert('Отлично !');
    } else 
    alert('Бяка !');
}


function exercise_6() {                                          // 6) triple prompt
    let surname = prompt('Введите фамилию', '');        
    let name = prompt('Введите имя', '');
    let patronymic = prompt('Введите отчество', '');
    alert(surname + ' ' + name + ' ' + patronymic);
}

function exercise_7_8() {                                     // 7 - 8) default: or; default: if
    let surname = prompt('Введите фамилию', '');        
    let name = prompt('Введите имя', '');
    let patronymic = prompt('Введите отчество', '');
    if (surname == '' || surname == null) 
        surname = 'Иванов'; 
    if (name == '' || name == null) 
        name = 'Иван';
    if (patronymic == '' || patronymic == null) 
        patronymic = 'Иванович';

    alert(surname + ' ' + name + ' ' + patronymic);
}

function exercise_9() {                                 // 9) login and password
    let loggin = prompt('Введите логин', '');

    if (loggin == 'admin') {
        let password = prompt('Введите пароль', ''); 

        if (password == 'qwerty') {
            alert('Поздравляю, все правильно');
        } else
            alert('Неправильный пароль');

    } else alert('Неправильный логин');
}


function exercise_10_11() {                            // 10 - 11) currency calc;   currency calc: improved
    let conversion, type;
    for (let i = 0; i< 1; i++) {
        type = prompt('Введите вариант валюты для переводa:\nusd\neur', '');
        type = type.toLowerCase();
        switch (type) {
            case 'usd': 
                conversion = 28.6;
                break;
            case 'eur': 
                conversion = 30.7;
                break;
            default:
                alert('Вы выбрали неправильный вариант')
                i--;
                break;
        }
    }
    let usersSum = +prompt('Введите суму для перевода', '');
    usersSum = usersSum / conversion;
    alert('Вы получили ' + usersSum.toFixed(2) + ' ' + type);

}


function exercise_12() {                        // 12) currency calc: two rates
    confirm('ВЫ хотите продать USD?') ? alert('Курс банка на покупку: 27.65 uan') : alert('Курс банка на продажу: 28.65 uan');
}


function exercise_13() {                      // 13) currency calc: if
    let question = confirm('ВЫ хотите продать USD?');
    if (question == true) 
        alert('Курс банка на покупку: 27.65 uan');
    else
        alert('Курс банка на продажу: 28.65 uan');
}



function exercise_14() {                        // 14) scissors
    alert('к = камень\nн = ножницы\nб = бумага');
    let human = prompt('Введите букву: к; н; б;', '').toLocaleLowerCase();

    if (human == 'к') 
        human = 1;
    if (human == 'н') 
        human = 2;
    if (human == 'б') 
        human = 3;
    let robot = Math.ceil((Math.random() * 3));
    console.log(robot);

    if (robot == human)
        alert ('Ничия');
    if (human == 1 && robot == 2)
        alert('Вы победили');
    if (human == 1 && robot == 3)
        alert('Вы проиграли');
    if (human == 2 && robot == 1)
        alert('Вы проиграли');
    if (human == 2 && robot == 3)
        alert('Вы победили');
    if (human == 3 && robot == 1)
        alert('Вы победили');
    if (human == 3 && robot == 2)
        alert('Вы проиграли');
}


function exercise_15() {        // 15) Задание на синий пояс
    var ratios = {
        usd: 25.6,
        eur: 29
    };
    let conversion, type;
    for (let i = 0; i< 1; i++) {
        type = prompt('Введите вариант валюты для переводa:\nusd\neur', '');
        type = type.toLowerCase();
        switch (type) {
            case 'usd': 
                conversion = ratios['usd'];
                break;
            case 'eur': 
                conversion = ratios['eur'];
                break;
            default:
                alert('Вы выбрали неправильный вариант')
                i--;
                break;
        }
    }
    let usersSum = +prompt('Введите суму для перевода', '');
    usersSum = usersSum / conversion;
    alert('Вы получили ' + usersSum.toFixed(2) + ' ' + type);
}

function exercise_16() {            // 16) Задание на черный пояс
    alert('к = камень\nн = ножницы\nб = бумага');
    let human = prompt('Введите букву: к; н; б;', '').toLowerCase();

    if (human == 'к') 
        human = 1;
    if (human == 'н') 
        human = 2;
    if (human == 'б') 
        human = 3;
    let robot = Math.ceil((Math.random() * 3));
    console.log(robot);

    (robot == human) ? alert ('Ничия') : ( (human == 1 && robot == 2) || (human == 2 && robot == 3) ||  (human == 3 && robot == 1)) ? alert('Вы победили') : alert('Вы проиграли');
}


let startHW;
for (let i = 0; i < 1; i++){
    startHW = prompt(`Введите номер задания (только цыфру):
            1) switch: sizes
            2) switch: if
            3) Number: age 
            4) confirm: or this days
            5) confirm: if this days
            6) triple prompt
            7) default: or
            8) default: if
            9) login and password
            10) currency calc
            11) currency calc: improved
            12) currency calc: two rates
            13) currency calc: if
            14) scissors
            15) Задание на синий пояс
            16) Задание на черный пояс `, '');
    if (isNaN(startHW) || +startHW < 1 || +startHW > 16 || startHW == ''){
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
    case 4: exercise_4();
        break;
    case 5: exercise_5();
        break;
    case 6: exercise_6();
        break;
    case 7:
    case 8: exercise_7_8();
        break;
    case 9: exercise_9();
        break;
    case 10: 
    case 11: exercise_10_11();
        break;
    case 12: exercise_12();
        break;
    case 13: exercise_13();
        break;
    case 14: exercise_14();
        break;
    case 15: exercise_15();
        break;
    case 16: exercise_16();
        break;
    default: alert('Error!');
        break;
}
