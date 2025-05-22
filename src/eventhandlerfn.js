import { setFlag, setTaskFlag, changeInput, addFormData, createTaskOverviewElement } from "./main";
import { toggleClass, createModal, createTaskModal, setTaskModal } from "./uiFns";

let taskDetails = {
    title: null,
    description: null,
    expiryDate: null,
    date: null,
    editDate: null,
    priority: null,
    id: null
};

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
    // taskDetails = null;
}

export {
    addBtnFn,
    cancelFn,
    submitFn,
    taskFn,
    editTaskFn,
    backFn
}