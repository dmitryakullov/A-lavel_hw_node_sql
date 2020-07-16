let mainBigRGB1=0,mainBigRGB2=0,mainBigRGB3=0;

function Control(el, {min=0, max=100, step=1, value=0, onChange, minAngle=0, maxAngle=360, src='1@3x.png', wheelStepRatio=0.01}={}, elRGB, type) {
    const img = document.createElement('img');
    el.appendChild(img);
    img.src = src;



    const changeRGB = (el,color,VALUE) =>{
        let endColor = (VALUE *2.5);
        if (color === 'red') {
            mainBigRGB1 = endColor;
            el.style.backgroundColor = `rgb(${endColor},0,0)`;
        } else if (color === 'green') {
            mainBigRGB2 = endColor;
            el.style.backgroundColor = `rgb(0,${endColor},0)`;
        } else {
            mainBigRGB3 = endColor;
            el.style.backgroundColor = `rgb(0,0,${endColor})`;
        }
        RGB.style.backgroundColor = `rgb(${mainBigRGB1},${mainBigRGB2},${mainBigRGB3})`;
    }

    // this.setWalue = () => {      Оно не работает(
    //     for (let i = 0; i< 1; i++){
    //         value = +prompt('Введите значение от 0 до 100', '0');
    //     if (isNaN(value) && value < 0 && value > 100 && value === '')
    //         i--;
    //     }
    // }
    // this.getValue = value;

    const getAngle = () => {
        const angleRatio = (maxAngle - minAngle) / (max - min);
        const offset = value - min;
        const angleOffset = offset * angleRatio;
        const angle = minAngle + angleOffset;
        return angle;
    };
    const updateImg = (angle = getAngle()) => img.style.transform = `rotate(${angle}deg)`;
    updateImg();

    const updateValue = (st=step) => {
        value += st % 100;
        if (value < 0) 
            value = 100 - value % 100;
        updateImg();
        onChange(value);
        changeRGB(elRGB,type,value);
    };

    // img.onclick = (e) => {
    //     const {x: imgX, width:imgWidth} = img.getBoundingClientRect();
    //     const xOnImg = e.clientX - imgX;
    //     const st = xOnImg > imgWidth/2 ? step: -step;
    //     updateValue(st);
    // };

    img.onmousewheel = (e) => {
        const st = e.deltaY*wheelStepRatio;
        updateValue(st);
    }
    let startAngle;

    const getAngleByCoords = (e) => {
        const {x: imgX, y: imgY, width, height} = img.getBoundingClientRect();
        const xOnImg = e.clientX - imgX - width/2;
        const yOnImg = e.clientY - imgY - height/2;
        return toDeg(Math.atan2(yOnImg, xOnImg));
    }

    img.onmousedown =e => {
        startAngle = getAngleByCoords(e);
    };
    let endAngle;
    const toDeg = rad => (360/(2*Math.PI))*rad;

    img.onmousemove = e => {
        e.preventDefault();

        if (e.buttons && startAngle) {
            const currentAngle = getAngleByCoords(e);
            const angleDiff = currentAngle - startAngle;
            endAngle = getAngle() + angleDiff;
            updateImg(endAngle);

            let inConsole = (endAngle / ((maxAngle - minAngle) / (max - min))) % 100;
            onChange(inConsole < 0 ? 75 + (25 + inConsole) : inConsole);
            changeRGB(elRGB,type,(inConsole < 0 ? 75 + (25 + inConsole) : inConsole));
        }; 
    };

    img.onmouseup = e => {
        let inValue = endAngle / ((maxAngle - minAngle) / (max - min))%100;
        value = inValue < 0 ? 75 + (25 + inValue) : inValue;
        updateImg(endAngle);
    };
    

};

let control_1 = new Control(control1, {onChange: (a)=> console.log(a)},R,'red');
let control_2 = new Control(control2, {onChange: (a)=> console.log(a)},G,'green');
let control_3 = new Control(control3, {onChange: (a)=> console.log(a)},B,'blue');