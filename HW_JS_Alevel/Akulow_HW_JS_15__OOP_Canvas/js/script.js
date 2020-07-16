
const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');

const width  = canvas.width;
const height = canvas.height;

let current;
let selection = [];

const tools = {
    graffity: {
        mousemove(e){ //e.buttons 0b00000x11 & 0b00000100 == x
            let {x: canvasX, y: canvasY} = canvas.getBoundingClientRect();
            let cordX = e.clientX - canvasX,
                cordY = e.clientY - canvasY;
            (e.buttons & 1) && new Circle(cordX, cordY, +size.value, color.value, fill.checked);
        }
    },
    circle: {
        mousedown(e){
            let {x: canvasX, y: canvasY} = canvas.getBoundingClientRect();
            let cordX = e.clientX - canvasX,
                cordY = e.clientY - canvasY;
            current = new Circle(cordX, cordY, 1, color.value, fill.checked);
        },
        mousemove(e){
            if (!current) return;
            let {x: canvasX, y: canvasY} = canvas.getBoundingClientRect();
            let cordX = e.clientX - canvasX,
                cordY = e.clientY - canvasY;

            current.radius = current.distanceTo(cordX, cordY);
            Drawable.drawAll();
        },

        mouseup(e){
            current = null;
        }
    },
    line: {
        mousedown(e){
            let {x: canvasX, y: canvasY} = canvas.getBoundingClientRect();
            let cordX = e.clientX - canvasX,
                cordY = e.clientY - canvasY;
            current = new Line(cordX, cordY, 0, 0, color.value, +size.value);
        },
        mousemove(e){
            if (!current) return;
            let {x: canvasX, y: canvasY} = canvas.getBoundingClientRect();
            let cordX = e.clientX - canvasX,
                cordY = e.clientY - canvasY;

            current.width = cordX - current.x;
            current.height = cordY - current.y;

            Drawable.drawAll();
        },

        mouseup(e){
            current = null;
        }
	},
	rectangle: {
		mousedown(e){
            let {x: canvasX, y: canvasY} = canvas.getBoundingClientRect();
            let cordX = e.clientX - canvasX,
                cordY = e.clientY - canvasY;
            current = new Rectangle(cordX, cordY, 0, 0, color.value, +size.value, fill.checked);
        },
        mousemove(e){
            if (!current) return;
            let {x: canvasX, y: canvasY} = canvas.getBoundingClientRect();
            let cordX = e.clientX - canvasX,
                cordY = e.clientY - canvasY;

            current.width = cordX - current.x;
            current.height = cordY - current.y;

            Drawable.drawAll();
        },

        mouseup(e){
            current = null;
        }
    },
    ellipse: {
		mousedown(e){
            let {x: canvasX, y: canvasY} = canvas.getBoundingClientRect();
            let cordX = e.clientX - canvasX,
                cordY = e.clientY - canvasY;
            current = new Ellipse(cordX, cordY, 0, 0, color.value, +size.value, fill.checked);
        },
        mousemove(e){
            if (!current) return;
            let {x: canvasX, y: canvasY} = canvas.getBoundingClientRect();
            let cordX = e.clientX - canvasX,
                cordY = e.clientY - canvasY;

            current.width = cordX - current.x;
            current.height = cordY - current.y;

            Drawable.drawAll();
        },

        mouseup(e){
            current = null;
        }
	},
    select: {
        click(e){
            console.log(e);
            let {x: canvasX, y: canvasY} = canvas.getBoundingClientRect();
            let cordX = e.clientX - canvasX,
                cordY = e.clientY - canvasY;

            let found = Drawable.instances.filter(c => c.in && c.in(cordX, cordY));
            if (found.length){
                if (e.ctrlKey){
                    selection.push(found.pop());
                }
                else {
                    selection = [found.pop()];
                }
            }
            else {
                if (!e.ctrlKey) selection = [];
            }

            Drawable.drawAll(selection);
        },
        mousedown(e){
            //
        },
        mousemove(e){

        },

        mouseup(e){
            //x,y, w, h РїСЂСЏРјРѕСѓРіРѕР»СЊРЅРёРєР°
            //selection - С‚РѕР»СЊРєРѕ С‚Рµ СЌР»РµРјРµРЅРµС‚С‹ Drawable.instances РєРѕС‚РѕСЂС‹Рµ РІ РіСЂР°РЅРёС†Р°С… РїСЂСЏРјРѕСѓРіРѕР»СЊРЅРёРєР°.
        },
    }
}



function superHandler(evt){
    let t = tools[tool.value];
    if (typeof(t[evt.type]) === 'function')
        t[evt.type].call(this, evt);
}


canvas.onmousemove = superHandler;
canvas.onmouseup   = superHandler;
canvas.onmousedown = superHandler;
canvas.onclick = superHandler;


function Drawable(){
    Drawable.addInstance(this);   
}

const distance = (x1,y1, x2, y2) => ((x1-x2)**2 + (y1-y2)**2)**0.5;

Drawable.prototype.draw = function(){};
Drawable.prototype.distanceTo = function(x,y){
    if (typeof this.x !== 'number' ||
        typeof this.y !== 'number'){
        return NaN;
    }
    return distance(this.x, this.y, x, y);
};
Drawable.instances = [];
Drawable.addInstance = function(item){
    Drawable.instances.push(item);
}

Drawable.drawAll = function(selection=[]){
    ctx.clearRect(0,0,width,height);
    Drawable.forAll(item => item.draw(selection.includes(item)));
    //selection.forEach(item  => item.draw(true));
}

Drawable.forAll = function(callback){
    for(var i = 0; i<Drawable.instances.length;i++){
        callback(Drawable.instances[i]);
    }
}

class Circle extends Drawable {
    constructor(x,y,radius, color,fill){
        super();
        this.x      = x;
        this.y      = y;
        this.radius = radius;
        this.color  = color;
        this.fill   = fill;

        this.draw(); 
    }

    draw(selected){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        if (selected){
            ctx.setLineDash([5, 15]);
            ctx.lineWidth = 2;
            ctx.stroke();
        } else {
            ctx.setLineDash([]);
        }
        if (this.fill) {
            ctx.fill();
        } else {
            ctx.stroke();
        }
    }

    in(x,y){
        return this.distanceTo(x,y) < this.radius;
    }

    inBounds(x,y,w,h){ // x = 100, this.x = 102, w = 5
        return this.x >= x && this.x <= x + w &&
                this.y >= y && this.y <= y + h;
    }
}


class Line extends Drawable {
    constructor(x,y, width, height, color, lineWidth){
        super()
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.color  = color;
        this.lineWidth  = lineWidth;

        this.draw(); 
    }
    

    draw(){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth   = this.lineWidth;
        ctx.stroke();
    }
}


class Rectangle extends Drawable {
    constructor(x,y, width, height, color, lineWidth, fill){
        super();
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.color  = color;
        this.lineWidth  = lineWidth;
        this.fill = fill;

        this.draw(); 
    }
    

    draw(selected){
        
        if (!selected) {
            ctx.setLineDash([]);

            if (this.fill) {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            } 
            else {
                ctx.beginPath();
                ctx.lineWidth = this.lineWidth;
                ctx.strokeStyle = this.color;
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.stroke();
            }
        }
        else {
            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.color;
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    in(x,y){
        if (x > this.x && y > this.y){
            return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
        }
        else if (x > this.x && y < this.y) {
            return x > this.x && x < this.x + this.width && y < this.y && y > this.y + this.height;
        }
        else if (x < this.x && y > this.y) {
            return x < this.x && x > this.x + this.width && y > this.y && y < this.y + this.height;
        }
        else {
            return x < this.x && x > this.x + this.width && y < this.y && y > this.y + this.height;
        }
    }
    
}


class Ellipse extends Drawable {
    constructor(x,y, width, height, color, lineWidth, fill){
        super();
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.color  = color;
        this.lineWidth  = lineWidth;
        this.fill = fill;

        this.draw(); 
    }


    draw(){
        ctx.setLineDash([]);

        if (this.fill) {
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.ellipse(this.x + this.width / 2, this.y + this.height / 2, Math.abs(this.width / 2), Math.abs(this.height / 2), 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        } 
        else {
            ctx.strokeStyle = this.color;
            ctx.beginPath();
            ctx.ellipse(this.x + this.width / 2, this.y + this.height / 2, Math.abs(this.width / 2), Math.abs(this.height / 2), 0, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
}



color.onchange = () => {
    selection.forEach(c => c.color = color.value);
    Drawable.drawAll(selection);
}

document.getElementById('delete').onclick = () =>{
    Drawable.instances = Drawable.instances.filter(item => !selection.includes(item));
    selection = [];
    Drawable.drawAll();
}



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

document.getElementById('sendChat').onclick = () =>{
    let sendIMG = canvas.toDataURL();
    jsonPost("http://students.a-level.com.ua:10012", {func: 'addMessage', nick: 'Canvas', message: `<img src="${sendIMG}">`});
}





//new Line(0,0,100,100, "red")
////new Circle(30,30,10, "red")

////canvas.onmousemove = function(e){
////}

//undo.onclick = function(){
    //Drawable.instances.pop()
    ////Drawable.instances = []
    //Drawable.drawAll()
//}







//////////////////////////////          MY CANVAS FIRST HOMEWORK        //////////////////////////



// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");

// let size = document.querySelector('#size'),
//     color = document.querySelector('#color');

// let radiusTassel = size.value, colourTassle = 'black';


// size.oninput = () => {
//     radiusTassel = parseInt(size.value);
// }
// color.oninput = () => {
//     colourTassle = color.value;
// }


// canvas.onclick = (e) => {
//     ctx.fillStyle = colourTassle;
//     let {x: canvasX, y: canvasY} = canvas.getBoundingClientRect();
//     let cordX = e.clientX - canvasX,
//         cordY = e.clientY - canvasY;
//     ctx.beginPath();
//     ctx.arc(cordX, cordY, radiusTassel, 0, Math.PI*2);
//     ctx.closePath() ;
//     ctx.fill();
// }

// canvas.onmousemove = (e) => {
//     ctx.fillStyle = colourTassle;

//     if (e.buttons) {
//         let {x: canvasX, y: canvasY} = canvas.getBoundingClientRect();
//         let cordX = e.clientX - canvasX;
//         let cordY = e.clientY - canvasY;
//         ctx.beginPath();
//         ctx.arc(cordX, cordY, radiusTassel, 0, Math.PI*2);
//         ctx.closePath() ;
//         ctx.fill();
//     }
// }


