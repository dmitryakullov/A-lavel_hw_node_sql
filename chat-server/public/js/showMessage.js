let history;
fetch('/message')
    .then(a => a.json())
    .then(a => {history = a; next()});

function next() {
    if (history !== undefined) {
        for (let obj of history) {
            if (obj == null) {
                continue;
            }
            let wrap = document.createElement('div');
            let hr = document.createElement('hr');
            wrap.innerHTML = `<br><b>Nick: </b> ${obj.nick} <b>Message: </b> ${obj.message} <br>`;
            if (obj.file !== undefined) {
                let img = document.createElement('img');
                img.src = '/upload/' + obj.file;
                wrap.append(img);
            }
            wrap.append(hr);
            msgWrapper.prepend(wrap);
        }
    }
}

