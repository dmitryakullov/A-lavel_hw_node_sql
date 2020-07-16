function sortObject() {
    var persons = [
        {name: "Иван", age: 17},
        {name: "Мария", age: 35},
        {name: "Алексей", age: 73},
        {name: "Яков", age: 12},
    ];
    
    function sortPersons(p,b,c) {
        if (b === 'age') {
            persons.sort(function(a,b) {
                return a.age - b.age;
            });
        }
    
        if (b === 'name') {
            if (c === true) {
                persons.sort(function(a,b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                });
            } else if (c === false) {
                persons.sort(function(a,b) {
                    if (a.name < b.name) {
                        return 1;
                    }
                    if (a.name > b.name) {
                        return -1;
                    }
                    return 0;
                });
            } else console.log('Неправильный ввод данных');
        }
    }
    
    sortPersons(persons, "age", true);
    console.log(persons);
}
sortObject();




function convertString() {
    let arr1 = ["1", {}, null, undefined, "500", 700];
    let arr2 = arr1.map(function(item) {
        return typeof(item) === 'string' ? +item : item;
    });
    console.log(arr2);
    
}
convertString(); 


function sumArrayOnlyNumber() {
    let arr1 = ["0", 5, 3, "string", null, 5, false, 5], arr2;
    arr2 = arr1.reduce(function(sum, current) {
        //console.log(sum, current);
        if (typeof(current) === "number") {
            sum = sum + current;
        }
        return sum;
    }, 0);
    console.log(arr2);
}
sumArrayOnlyNumber();



function myFilter() {
    var phone = {
        brand: "meizu",
        model: "m2",
        ram: 2,
        color: "black",
    };
    let phoneResault = {};
    function filterMy(value, key, obj) {
        for(let [key1, value1] of Object.entries(obj)){
            if (key1 == key || value1 == value) {
                phoneResault[key1] = value1;
            }
        }
        console.log(phoneResault);
        return phoneResault;
    }
    filterMy(2, 'color', phone);
}
myFilter();


function objectMap() {
    let obj = {name: "Иван", age: 17}, objResault = {};
    function myMap() {
        for (let [value, key] of Object.entries(obj)){
            objResault[value + '_'] = key + '$';
        }
        return objResault;
    }
    console.log(myMap());
}
objectMap();




function sumTo(n) {
    if (n == 1) return 1;
    return n + sumTo(n - 1);
}
console.log(sumTo(33));
