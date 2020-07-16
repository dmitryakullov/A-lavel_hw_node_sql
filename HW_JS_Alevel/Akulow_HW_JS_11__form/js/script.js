function Form(el, data, okCallback, cancelCallback){

    let formStart = document.createElement('h2');
    formStart.innerText = 'Не GOOGLE форма, но сойдёт';
    el.appendChild(formStart);
    

    this.okCallback     = okCallback;
    this.cancelCallback = cancelCallback;

    this.data           = data;
    this.validators     = {};

    let addKeyInValidators = () => {
        for (let key in data) {
            this.validators[key] = (value) => value.length > 2 && value != '' && value[0].toUpperCase() == value[0] ? true : false;
        }
    }
    addKeyInValidators();


    let inputCreators = {
        string(key, value) {
            let input = document.createElement('input');

            let allStars =0;
            while (value[allStars] === '*') {
                allStars++;
            }
            if(allStars === value.length) {
                input.type = 'password';
                input.placeholder = 'Введите пароль';
            } else {
                input.type = 'text';
                input.placeholder = key;
                input.value = value;
            }
            return input;
        },
        boolean(value) {
            let input = document.createElement('label');
            inputMain = document.createElement('input');
            input.appendChild(inputMain);
            inputMain.type = 'checkbox';
            if (value == true) {
                inputMain.setAttribute('checked','checked');
            }
            return input;
        },
        Date(value) {
            let input = document.createElement('input');
            input.type = 'datetime-local';
            input.value = `${value.getFullYear()}-${(value.getMonth()+1+'').length<2 ? '0'+(value.getMonth()+1) : value.getMonth()+1}-${(value.getDate()+'').length<2 ? '0'+value.getDate() : value.getDate()}T${(value.getHours()+'').length<2 ? '0'+value.getHours() : value.getHours()}:${(value.getMinutes()+'').length<2 ? '0'+value.getHours() : value.getHours()}`;
            return input;
        },
        longText(key,value) {
            let input = document.createElement('textarea');
            input.placeholder = key;
            input.value = value;
            return input;
        }
    }

    
    let arrForInputs =[];
    let checkValidation = false;
    let actionONINPUT; // oninput
    let arrForCheck =[];
    let objCheckValidation = {};


    let formBtn = document.createElement('div');
    let okButton = document.createElement('button');
    okButton.innerHTML = 'OK';
    let cancelButton = document.createElement('button');
    cancelButton.innerHTML = 'Cancel';
    
    if (typeof okCallback === 'function'){
        formBtn.appendChild(okButton);
        okButton.onclick = (e) => {
            console.log(this);
            this.okCallback(e);
        }
    }
    if (typeof cancelCallback === 'function'){
        formBtn.appendChild(cancelButton);
        cancelButton.onclick = cancelCallback;
    }

    
    for (let [key, value] of Object.entries(data)) {
        let wrap = document.createElement('div');
        el.appendChild(wrap );

        let textKey = document.createElement('div');
        let keyCheck;
        
        if (key[0] === '*') {
            let requiredField = document.createElement('b');
            requiredField.innerText = '*';
            textKey.appendChild(requiredField);
            keyCheck = key;

            let p = document.createElement('p');
            p.innerText = (key.slice(1)) + ':';
            textKey.appendChild(p);
        } else {
            textKey.innerText = key + ':  ';
        }
        wrap.appendChild(textKey);



        let formInput;
        if (typeof(value) === 'boolean') {      //DEFINE TYPE OF INPUT
            formInput = inputCreators.boolean(value);
        } else if (value.length > 20) {
            formInput = inputCreators.longText(key,value);

        } else if (typeof(value) === "object") {
            if (value.constructor.name === "Date") {
                formInput = inputCreators.Date(value);
            }
        } else {
            formInput = inputCreators.string(key, value);
        }
        wrap.appendChild(formInput);
        arrForInputs.push(formInput);


        if (key === keyCheck) {
            arrForCheck.push(formInput);
        }


        let errorText = document.createElement('span');
        errorText.innerText = 'Неправильный ввод в поле!';
        wrap.appendChild(errorText);


        actionONINPUT = formInput.oninput = () => {      // ONINPUT
            if (typeof(value) === 'boolean') {
                if (formInput.firstChild.checked) {
                    data[key] = true;
                } else data[key] = false;
            } else {
                data[key] = formInput.value;
            }
            
            if (key === keyCheck) {  // VALIDATOR
                checkValidation = this.validators[key](formInput.value);
                objCheckValidation[key] = checkValidation;
                if (checkValidation === false) {
                    formInput.classList.add("error");
                    errorText.style.display = 'block';
                } else {
                    formInput.classList.remove("error");
                    errorText.style.display = 'none';
                }
            }

            if (checkValidation === false) {
                okButton.setAttribute('disabled','disabled');
                okButton.classList.add('disabled-button');
            } else if (checkValidation === true) {
                okButton.removeAttribute('disabled');
                okButton.classList.remove('disabled-button');
            }
        }
    }
    
    el.addEventListener('input', () => {
        let YYY =0, XXX=0;
        for (let item of arrForCheck) {
            if (item.value.length === 0) {
                XXX++;
            }
            for(let key in objCheckValidation) {
                objCheckValidation[key] === false ? YYY++ : '';
            }
            if (XXX !== 0 || YYY !== 0) {
                okButton.setAttribute('disabled','disabled');
                okButton.classList.add('disabled-button');
            } else {
                okButton.removeAttribute('disabled');
                okButton.classList.remove('disabled-button');
            }
        }
    })

    actionONINPUT();

    cancelButton.addEventListener('click',()=> {
        for(let item of arrForInputs) {
            if (item.firstChild !== null) {
                if (item.firstChild.checked === true)
                item.firstChild.removeAttribute("checked");
            } else {
                item.value = '';
            } 

            actionONINPUT();
        }
        for(let key in data) {
            data[key] = '';
        }
    });

    el.appendChild(formBtn);
}

let formContainer = document.querySelector('.form-container');


let form = new Form(formContainer, 
    {
        '*name': 'Anakin',
        '*surname': 'Skywalker',
        password: '******',
        married: true,
        birthday: new Date((new Date).getTime() - 86400000 * 30*365),
        wishes: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, dignissimos.'
    }, 
    () => console.log('ok'),() => console.log('cancel') );

form.okCallback = () => console.log('ok2');
console.log(form);


let formContainer2 = document.querySelectorAll('.form-container')[1];
let form2 = new Form(formContainer2, 
    {
        "*Name": 'Дмитрий',
        "*Surname": 'Aкулов',
        Age: 19,
        Patronymic: ' --- ',
        Password: '***********',
        '*Country': 'Ukraine',
        '*City': 'Kharkov',
        married: false,
        birthday: new Date("2000-06-21"),
        wishes: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum corrupti eligendi minus sapiente ut deleniti tempore! Tempora hic, aut voluptatibus vitae quos nemo dolorem ea similique rem at soluta reiciendis, atque provident aperiam, aliquid voluptatem consectetur animi! Maxime minima dolore veniam natus, optio accusamus voluptatum cupiditate sed, officia doloremque repellat?'
    }, 
    () => console.log('ok'),() => console.log('cancel') );