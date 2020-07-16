chooseBTN.onclick =() => {
    fetch('/message/getId',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({num: number2.value})
    })
        .then( ansv => ansv.text())
        .then( ansv => getAnsv.innerText = ansv )//
}
button2.onclick = () => {
    let obj = {
        nick: nick2.value,
        message: message2.value
    }
    fetch('/message/id',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(obj)
    })
        .then(ansv => ansv.text())
        .then(ansv => getAnsv.innerText = ansv);
    nick2.value = '';
    message2.value = '';
}
delete2.onclick = () => {
    fetch('/message/id',{
        method: "DELETE"
    })
        .then( ansv => ansv.text())
        .then(ansv => getAnsv.innerText = ansv);
}