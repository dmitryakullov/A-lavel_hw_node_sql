
function create_Select_For_Countryes_And_Sityes() {
    let select1 = document.querySelector('#select1'),
        select2 = document.querySelector('#select2');

    var request = new XMLHttpRequest(); 
    function getCountryDatas(func) {
        request.open('GET', 'https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json', true);
        request.onreadystatechange = function(){ 
            if (request.readyState != 4){
                return;
            }
            if (request.status == 200){
                //console.log('all ok');
            }
            else {
                alert('shit happens: ' +  request.status + ', ' + request.statusText );
            }
            func();
        }
        request.send();
    }


    getCountryDatas(createSelectForCountryes);


    function createSelectForCountryes() {
        const data = JSON.parse(`${request.responseText}`);

        let countryKey;
        for(countryKey in data) {
            let countryOption = document.createElement('option');
            countryOption.innerText = countryKey;
            select1.appendChild(countryOption);
        }

        let varForCheck = 0;
        let arrForRemove =[];

        select1.addEventListener('input', ()=> {
            
            if (varForCheck ===0) {
                creatrCityesOption();
            } else {
                removeCityesOption();
                creatrCityesOption();
            }

            function creatrCityesOption() {
                for(let itemCountry of data[select1.value]) {
                    let cityOption = document.createElement('option');
                    cityOption.innerText = itemCountry;
                    select2.appendChild(cityOption);

                    arrForRemove.push(cityOption);
                    varForCheck++;
                }
            }

            function removeCityesOption() {
                for (let val of arrForRemove) {
                    val.remove();
                }

                arrForRemove =[]; 
                varForCheck = 0
            }
        });
    }

}
create_Select_For_Countryes_And_Sityes();








function createTableForDatas() {
    let div = document.querySelector('#table');

    let table;
    let url = 'https://swapi.dev/api/people/1/';

    

    function getData(url) {
        fetch(url)
            .then(res => res.json())
            .then(data => createTable(data));
    }
    getData(url);
    

    function createTable(data){
        console.log(data);

        table = document.createElement("table");
        table.setAttribute('border', '1px');
        div.appendChild(table);

        let btn;

        for (let [key, value] of Object.entries(data)) {
            let tr = document.createElement('tr');
            table.appendChild(tr);

            let td1 = document.createElement('td');
            td1.innerText = key;
            tr.appendChild(td1)

            let td2 = document.createElement('td');

            if (typeof(value) === 'number') {
                td2.innerText = value;
            } else if(Array.isArray(value)) {
                for (let arrValue of value) {
                    btn = document.createElement('button');
                    btn.innerText = 'Info';
                    td2.appendChild(btn);

                    btn.onclick = () => {
                        table.remove();
                        getData(arrValue);
                    }
                }
            } else if (value.slice(0,4) === 'http') {
                btn = document.createElement('button');
                btn.innerText = 'Click'
                td2.appendChild(btn);

                btn.onclick = () => {
                    table.remove();
                    getData(value);
                }
            }  else {
            td2.innerText = value;
            }
            tr.appendChild(td2)
        }
    }

    

}
createTableForDatas();