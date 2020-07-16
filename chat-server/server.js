const express = require('express');
const bodyParser = require('body-parser');
const app     = express();
const fs = require('fs');
const mongoose = require('mongoose');

let picture, myParam, checkFileName;

mongoose.connect('mongodb://localhost/fsa3', {useNewUrlParser: true});

const db = mongoose.connection;

const messageSchema = new mongoose.Schema({
    nick: String,
    message: String,
    file: String,
    replyTo: mongoose.Types.ObjectId
});

var Message = mongoose.model('Message', messageSchema);

db.on('error', console.error.bind(console, 'connection error:'));

mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/message', async (req, res) => res.send(await Message.find()))


app.post('/file', (req, res) => {
    let fileName = Math.random().toString('36')
    if (fileName != checkFileName) {
        picture = fileName;
    }
    checkFileName = fileName;

    fileName     = `upload/${fileName}`
    let fileStream = fs.createWriteStream('public/' + fileName);


    

    req.pipe(fileStream)
    req.on('end', () =>{
        res.end(fileName)
    })
})


// app.get('/file', (req, res) => {
//     fs.readdirSync('public/upload').forEach(file => {
//         console.log(file);
//     });
//     res.end(JSON.stringify(fs.readdirSync('public/upload')));
// })

// app.post('/', (req, res) => {
//     history.push(req.body);
//     res.status(201).send(req.body);
// })



// app.get('/message', (req, res) => {
//     res.send(JSON.stringify(history));
// })



// app.put('/message/getId', (req, res) => {
//     myParam = +req.body.num - 1;
//     if (myParam > history.length-1) {
//         res.send(`Сообщения под номером ${myParam + 1} - несуществует!`);
//     } else {
//         res.send(JSON.stringify(history[myParam]));
//     }
// })

app.put('/message/getId', async (req, res) =>{ 
            myParam = req.body.num;
            res.send(
                await Message.findOne({_id: mongoose.Types.ObjectId(myParam)}) //используем findOne для поиска записи по id
            );
        }
    );

app.post('/', async (req, res) => {
    req.body.file = picture;
    console.log(req.body);
    let newMessage = new Message(req.body) //создание сообщения с полями nick и message. Можно и newMessage.nick = req.body.nick
    await newMessage.save() //сохранение
    res.status(201).send(newMessage) //201 - Entity Created Code. Возвращаем запись из бд с _id
})

app.put('/message/id', (req, res) => {
    (async () => {
        await Message.findByIdAndUpdate(myParam, req.body);
        res.send(
            await Message.findOne({_id: mongoose.Types.ObjectId(myParam)}) //используем findOne для поиска записи по id
        );
    })();
    
});

app.delete('/message/id', async (req, res) => { 

    await Message.deleteOne( {"_id" : mongoose.Types.ObjectId(myParam)}); 
    res.send('Сообщение удалено!');  
})


app.listen(4000, () => console.log('listen on 4k port'));

