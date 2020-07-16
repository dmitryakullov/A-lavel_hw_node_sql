function exercise_1() {             // 1) html tree
    var body = {
        tagName: 'body',
        subTags: [
            {
                tagName: 'div',
                subTags: [
                    {
                        tagName: 'span',
                        text: 'Enter a data please:'
                    },
                    {
                        tagName: 'br'
                    },
                    {
                        tagName: 'input',
                        type: 'text',
                        id: 'name'
                    },
                    {
                        tagName: 'input',
                        type: 'text',
                        id: 'surname'
                    }
                ]
            },
            {
                tagName: 'div',
                subTags: [
                    {
                        tagName: 'button',
                        id: 'ok',
                        text: 'OK'
                    },
                    {
                        tagName: 'button',
                        id: 'cancel',
                        text: 'Cancel'
                    }
                ]
            }
        ]
    };
    console.log(body.subTags[1].subTags[1].text);
    console.log(body.subTags[0].subTags[3].id);
}

function exercise_2_3() {     // 2 - 3) declarative fields;    object links
    var notebook = {
        brand: "HP",
        type:  "440 G4",
        model: "Y7Z75EA",
        ram: 4,
        size: "14",
        weight: 1.8,
        resolution: {
            width: 1920,
            height: 1080,
        },
    };
    
    var phone = {
        brand: "meizu",
        model: "m2",
        ram: 2,
        color: "black",
    };
    
    var person = {
        name: prompt('Введите имя', ''),
        surname: prompt('Введите фамилию', ''),
        phoneNumber: +prompt('Введите номер телефона', ''),
        email: prompt('Введите email', ''),
        age: confirm('Вам есть 18?')
    };
    person.smartphone = {owner: ''};
    person.laptop = person.smartphone;
    console.log(person);
}

function exercise_4() {             // 4) imperative array fill 3
    var home = {
        floors: +prompt('Введите количество этажей', ''),
        flats: +prompt('Введите количество квартир', ''),
        enterenses: +prompt('Введите количество подъездов', '')
    };
    console.log(home);
}

function exercise_5() {         // 5)  while confirm
    var agree = confirm('Yes, or no');
    while (agree == false) {
        agree = confirm('Yes, or no');
    }
}

function exercise_6() {             // 6) array fill
    var answers = [];
    for (let i = 0; true; i++){
        answers.push(prompt('Write something', ''));
        if(answers[i] == null) {
            break;
        }
    }
    console.log(answers);
}

function exercise_7() {             // 7) array fill nopush
    var answers = [];
    for (let i = 0; true; i++){
        answers[i] = prompt('Write something', '');
        if(answers[i] == null) {
            break;
        }
    }
}

function exercise_8() {         // 8) infinite probability
    for (let i = 1; true; i++) {
        let mathR = Math.random();
        console.log(mathR);
        if (mathR > 0.9){
            alert(i);
            break;
        }
    }
}

function exercise_9() {             // 9) empty loop
    let question = null;
    while (typeof(question) === "object"){
        question = prompt('', '');
    }
}

function exercise_10() {            // 10) progression sum
    let arr = [], sum = 0;
    let N = +prompt('Введите число', '');
    for(let i = 1, j = 0; i <= N; i += 3, j++) {
        arr[j] = i;
        sum += arr[j];
    }
    alert('Сумма:' + sum);
}

function exercise_11() {            // 11) chess one line
    let str = '';
    let lengthStr = +prompt('Введите длину строки', '');
    for (let i = 1; i <= lengthStr; i++) {
        if (i%2 == 0){
            str += '#';
        } else {
            str += ' ';
        }
    }
    console.log(str);
}

function exercise_12() {            // 12) numbers
    let str = '';
    for(let i = 0; i <= 9; i++){
        for(let j = 0; j <= 9; j++){
            str += j;
        }
        str += '\n';
    }
    console.log(str);
}


function exercise_13() {         // 13) chess
    let i, j;
    let Width = +prompt('Введите ширину доски', '8'),
        Height = +prompt('Введите высоту доски', '8'),
        str = '';
    for (i = 1; i <= Height; i++){
        for (j = 1; j<= Width; j++){
            if (i % 2 == 1) {
                if (j % 2 == 1) {
                    str += '.';
                } else {
                    str += '#';
                }
            } else{
                if (j % 2 == 1) {
                    str += '#';
                } else {
                    str += '.';
                }
            }
        }
        str += '\n';
    }
    console.log(str);
}


function exercise_14() {            // 14) cubes
    let arr =[],
        n = +prompt('Введите количество элементов в масиве', '10');
    for (let i = 0; i < n; i++) {
        arr[i] = Math.pow(i, 3);
    }
    console.log(arr);
}

function exercise_15() {            // 15)  multiply table
    let arr = [[]], i, j;
    for (i = 0; i <= 10; i++){
        arr[i] = [];
    }
    for (j = 0; j <= 10; j++){
        for (let x = 0; x<= 10; x++){
            arr[j][x] = j * x;
        }
    }
    console.log(arr);
} 
        
function exercise_16() {        // 16) matrix to html table
    let table = '',
        col = 20,
        row = 20,
        tr,
        td;
    table += '<table border="1">';
        for (tr = 1; tr <= row; tr++){
            table += "<tr>";
            for (td = 1; td <= col; td++){
                table += '<td>' + (tr * td) + '</td>';
            }
            table += "</tr>";
        }
    table += '</table>';
    document.write(table);
}


function exercise_17() {            // 17) Задание на синий пояс: Треугольник
    var i = 0, j = 0;
    var max = 6;
    var dot,
        hashtag,
        dotAfter;

    while (i < max) {
        dot = '';
        hashtag = '';
        dotAfter = '';
        for (j = 0; j < max - i - 1; j++) dot += '.';
        for (j = 0; j < 2 * i + 1; j++) hashtag += '#'; 
        for (j = 0; j < 5 -i; j++) dotAfter += '.';
        console.log(dot + hashtag + dotAfter);
        i++;
    }
}


function exercise_18() {        // 18) Задание на черный пояс: Электронная гадалка
    let robot,
        person,
        predictArray = [1,1,1,1];
        numberOfGames = 15;
    alert('У вас есть ' + numberOfGames + ' попыток');
    for (let i = 1; i <= numberOfGames; i++) {
        robot = Math.ceil(Math.random()*10);
        if (robot % 2 === 1) {
            robot = 0;
        } else {
            robot = 1;
        }
        console.log(robot);

        for (let i = 0; i < 1; i++){
            person = +prompt('Введите 0, или 1', '');
            if (person != 1 && person != 0){
                alert('Введите либо 1, либо 0');
                i--;
            }
        }

        predictArray.shift();
        predictArray.push(person);
        console.log(predictArray);

        if (robot === person) {
            alert(robot + '  - гадалка угадала В )');
        } else {
            alert(robot + '  - гадалка не угадала : (');
        }
    }
}



let startHW;
for (let i = 0; i < 1; i++){
    startHW = prompt(`Введите номер задания (только цыфру):
            1) html tree
            2) declarative fields
            3) object links
            4) imperative array fill 3
            5) while confirm
            6) array fill
            7) array fill nopush
            8) infinite probability
            9) empty loop
            10) progression sum
            11) chess one line
            12) numbers
            13) chess
            14) cubes
            15) multiply table
            16) matrix to html table
            17) Задание на синий пояс: Треугольник
            18) Задание на черный пояс: Электронная гадалка `, '');
    if (isNaN(startHW) || +startHW < 1 || +startHW > 18 || startHW == ''){
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
    case 11: exercise_11();
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
    case 17: exercise_17();
        break;
    case 18: exercise_18();
        break;
    default: alert('Error!');
        break;
}
