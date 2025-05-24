// import { setFlag, setTaskFlag } from "./flag";
// import { createModal, toggleClass, createTaskModal, setTaskModal } from "./uiFns";
let flag = 0; //modal not on screen
let taskFlag = 0;

function setFlag() {
    return ++flag;
}

function setTaskFlag() {
    return ++taskFlag;
}

function addBtnFn(e) {
    let flag = setFlag();

    if (flag === 1) {  //flag == 1 means modal already created
        createModal();
    }

    document.querySelector("#form-heading").textContent = "Add a new task"
    document.querySelector("#submit").textContent = "Add Task"
    document.querySelector("#submit").opVal = "add"

    toggleClass();
}

function taskFn(e) {
    let taskId = e.srcElement.taskId;
    taskDetails = JSON.parse(localStorage.getItem("data")).find((item) => item.id === taskId);

    let taskFlag = setTaskFlag();
    if (taskFlag == 1) {
        createTaskModal()
    }

    setTaskModal(taskDetails);
    document.querySelector("#task-display-modal").classList.toggle("task-hidden");
    document.querySelectorAll(".other")[0].classList.toggle("task-hidden");
    document.querySelectorAll(".other")[1].classList.toggle("task-hidden");
    document.querySelector("#task").classList.toggle("task-hidden");
}

//#############################
//############uiFns.js###################

function createModal (){
    let modal = document.createElement("div");
    modal.className = "modal-inner"

    let heading = document.createElement("h1");
    heading.textContent = "Add Your Task";
    heading.id = "form-heading"

    let form = document.createElement("form");
    form.className = "modal-form"
    form.id = "form"
    form.addEventListener("submit", submitFn);

    let inputName = document.createElement("input");
    inputName.type= "text"
    inputName.required = true
    inputName.placeholder = "Title"

    let inputDescription = document.createElement("textarea")
    inputDescription.placeholder = "Appointment with Doctor..."
    inputDescription.required = true;

    let inputDate = document.createElement("input");
    inputDate.type = "date"
    inputDate.required = true

    let priorty = document.createElement("input");
    priorty.type = "number";
    priorty.min = 1;
    priorty.placeholder = "Priorty"
    priorty.required = true;

    let submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Add Task";
    submit.id = "submit";
        
    let cancel = document.createElement("button");
    cancel.type = "button";
    cancel.textContent = "Cancel";
    cancel.id = "cancel";
    cancel.addEventListener("click", cancelFn);

    document.querySelector("#modal").appendChild(modal)
    modal.appendChild(heading)
    modal.appendChild(form)
    form.appendChild(inputName)
    form.appendChild(inputDescription)
    form.appendChild(inputDate)
    form.appendChild(priorty)
    form.appendChild(submit)
    form.appendChild(cancel)
}

function toggleClass () {
    document.querySelectorAll(".other")[0].classList.toggle("task-hidden");
    document.querySelectorAll(".other")[1].classList.toggle("task-hidden");
    document.querySelector("#modal").classList.toggle("task-hidden");
    document.querySelector("#modal").classList.toggle("modal");
    document.querySelector("#task").classList.toggle("task-hidden");
}

function createTaskModal () {
    let modal = document.createElement("div");
    modal.className = "modal-inner-task"

    let heading = document.createElement("h1");
    heading.id = "task-heading"
    let creationDate = document.createElement("span");
    creationDate.id = "task-creation-date"
    let para = document.createElement("p");
    para.id = "task-para"

    let wrapper = document.createElement("div");
    wrapper.className = "exp-wrapper"

    let expiryDate = document.createElement("span");
    expiryDate.id = "task-expiry"
    
    let priorty = document.createElement("span");
    priorty.id = "task-priorty"

    let btnWrapper = document.createElement("div");
    wrapper.className = "btn-wrapper"

    let edit = document.createElement("button");
    edit.type = "button";
    edit.innerHTML = `Edit`;
    edit.id = "edit";
    edit.addEventListener("click", editTaskFn);

    let back = document.createElement("button");
    back.type = "button";
    back.textContent = "Back";
    back.id = "back";
    back.addEventListener("click", backFn);

    document.querySelector("#task-display-modal").appendChild(modal)
    modal.appendChild(heading)
    modal.appendChild(creationDate)
    modal.appendChild(para)
    modal.appendChild(wrapper)
    wrapper.appendChild(expiryDate)
    wrapper.appendChild(priorty)
    modal.appendChild(btnWrapper)
    btnWrapper.appendChild(edit)
    btnWrapper.appendChild(back)
}

function setTaskModal(taskDetails) {
    let heading = document.getElementById("task-heading");
    heading.textContent = taskDetails.title;

    let creationDate = document.getElementById("task-creation-date");
    let date = new Date(taskDetails.date)
    creationDate.textContent = date.toUTCString();

    let para = document.getElementById("task-para");
    para.textContent = taskDetails.description;

    let expiryDate = document.getElementById("task-expiry");
    expiryDate.innerHTML = `<span class="h">Deadline:</span> <span class="dl"> ${taskDetails.expiryDate} </span>`;

    let priorty = document.getElementById("task-priorty");
    priorty.innerHTML = `<span class="h">Priority:</span> <span class="dl"> ${taskDetails.priorty}</span>`;
}

let taskDetails = {
    title: null,
    description: null,
    expiryDate: null,
    date: null,
    editDate: null,
    priority: null,
    id: null
};

// function addBtnFn(e) {
//     let flag = setFlag();

//     if (flag === 1) {  //flag == 1 means modal already created
//         createModal();
//     }

//     document.querySelector("#form-heading").textContent = "Add a new task"
//     document.querySelector("#submit").textContent = "Add Task"
//     document.querySelector("#submit").opVal = "add"

//     toggleClass();
// }

function submitFn(e) {
    e.preventDefault();

    let checkOp = document.querySelector("#submit").opVal;

    let formInputData = addFormData(checkOp, taskDetails);

    let data = JSON.parse(localStorage.getItem("data")) || [];

    if (checkOp == "add") {
        data.push(formInputData)
        localStorage.setItem("data", JSON.stringify(data));
    } else {
        data = data.filter(item => item.id != formInputData.id)
        document.getElementById(formInputData.id).remove();
        data.push(formInputData)
        localStorage.setItem("data", JSON.stringify(data));
    }
    setTimeout(() => {
        document.querySelector("#loading").classList.toggle("task-hidden")
        let task = null;
        createTaskOverviewElement(task, formInputData, document.querySelector("#task"))
        toggleClass();
        changeInput();
    }, 0);

}

function cancelFn(e) {
    e.preventDefault();
    toggleClass();
    changeInput();
    // taskDetails = null;
}

// function taskFn(e) {
//     let taskId = e.srcElement.taskId;
//     taskDetails = JSON.parse(localStorage.getItem("data")).find((item) => item.id === taskId);

//     let taskFlag = setTaskFlag();
//     if (taskFlag == 1) {
//         createTaskModal()
//     }

//     setTaskModal(taskDetails);
//     document.querySelector("#task-display-modal").classList.toggle("task-hidden");
//     document.querySelectorAll(".other")[0].classList.toggle("task-hidden");
//     document.querySelectorAll(".other")[1].classList.toggle("task-hidden");
//     document.querySelector("#task").classList.toggle("task-hidden");
// }

function editTaskFn(e) {
    document.querySelector("#task-display-modal").classList.toggle("task-hidden");
    document.querySelector("#modal").classList.toggle("task-hidden");
    document.querySelector("#modal").classList.toggle("modal");

    let flag = setFlag();
    if (flag === 1) {  //flag == 1 means modal already created
        createModal();
    }

    document.querySelector("#form-heading").textContent = "Edit Your Task"
    document.querySelector("#submit").textContent = "Edit Task"
    document.querySelector("#submit").opVal = "edit"

    changeInput(taskDetails);
}

function backFn(e) {
    document.querySelector("#task-display-modal").classList.toggle("task-hidden");
    document.querySelectorAll(".other")[0].classList.toggle("task-hidden");
    document.querySelectorAll(".other")[1].classList.toggle("task-hidden");
    document.querySelector("#task").classList.toggle("task-hidden");
}

export {
    addBtnFn,
    taskFn
}