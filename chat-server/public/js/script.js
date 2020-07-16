button1.onclick = () => {
    let obj = {
        nick: nick1.value,
        message: message1.value,
    };
    (async () => {
        if(file.files[0]) {
            await (async () => {
                url.innerHTML = url.href = "/" + await (await fetch('/file', {
                    method: "POST",
                    body: file.files[0]
                })).text()
            })();
        }
        await fetch('/',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(obj)
        });


        nick1.value = '';
        message1.value = '';
        file.value = '';
    })();
    
} 

// file.onchange = async () => {
//     url.innerHTML = url.href = "/" + await (await fetch('/file', {
//         method: "POST",
//         body: file.files[0]
//     })).text()
// }