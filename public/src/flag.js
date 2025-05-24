let flag = 0; //modal not on screen
let taskFlag = 0;

function setFlag() {
    return ++flag;
}

function setTaskFlag() {
    return ++taskFlag;
}

export {
    setFlag,
    setTaskFlag
}