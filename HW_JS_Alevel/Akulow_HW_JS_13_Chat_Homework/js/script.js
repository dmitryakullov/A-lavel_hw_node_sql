function jsonPost(url, data) {
    return new Promise((resolve, reject) => {
        var x = new XMLHttpRequest();   
        x.onerror = () => reject(new Error('jsonPost failed'));
        //x.setRequestHeader('Content-Type', 'application/json');
        x.open("POST", url, true);
        x.send(JSON.stringify(data));

        x.onreadystatechange = () => {
            if (x.readyState == XMLHttpRequest.DONE && x.status == 200){
                resolve(JSON.parse(x.responseText));
            }
            else if (x.status != 200){
                reject(new Error('status is not 200'));
            }
        }
    });
}

let input1 = document.querySelector('.inp-nick'),
    input2 = document.querySelector('.inp-message'),
    btn = document.querySelector('.send-btn'),
    chatSpace = document.querySelector('.chat');

    
function sendMessageInCommonChat() {
    function checkInputs(){
        input1.value == '' || input2.value == ''? btn.classList.add('block-btn'): btn.classList.remove('block-btn');
    }
    
    input1.oninput=input2.oninput=checkInputs;
    
    btn.onclick = () => {
        (input1.value == '' || input2.value == '') ? reject() : resolve();
        function resolve(){
            jsonPost("http://students.a-level.com.ua:10012", {func: 'addMessage', nick: input1.value, message: input2.value});
            input1.value = '';
            input2.value = '';
        }
        function reject() {
            btn.classList.add('block-btn');
        }
    }
}
sendMessageInCommonChat()


let numberMssage = 0;

function getChatData() {
    jsonPost("http://students.a-level.com.ua:10012", {func: "getMessages", messageId: numberMssage})
        .then((d) => createSpaceForChat(d));
}
getChatData()


function createSpaceForChat(data) {

    for (let elem of data.data) {
        if (elem.nick === '' || elem.message === '' || typeof(elem.nick) === 'object' || typeof(elem.nick) === 'undefined') {
            continue;
        }
        let mainWrap = document.createElement('div');
        let innerWrap = document.createElement('div');
        mainWrap.appendChild(innerWrap);

        let nick = document.createElement('b');
        nick.innerHTML = elem.nick + ':';
        innerWrap.appendChild(nick);

        let message = document.createElement('span');
        message.innerHTML = elem.message;
        innerWrap.appendChild(message);

        let timeData = document.createElement('span');
        let t = new Date(elem.timestamp); // Time
        timeData.innerText = ((t.getHours()+'').length>1 ? t.getHours() : '0'+t.getHours()) +':'+ ((t.getMinutes()+'').length>1 ? t.getMinutes() : '0'+t.getMinutes());
        mainWrap.appendChild(timeData);

        chatSpace.prepend(mainWrap);
    }
    numberMssage = data.nextMessageId;

    updateChat();
}

async function updateChat() {
    setInterval(getChatData(),1000);
}