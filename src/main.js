import { addBtnFn, taskFn } from "./eventhandlerfn";

let addBtn = document.querySelector("#add-btn")
let flag = 0; //modal not on screen
let taskFlag = 0;

function setFlag() {
    return ++flag;
}

function setTaskFlag() {
    return ++taskFlag;
}

displayTasks();

addBtn.addEventListener("click", addBtnFn)

function changeInput(taskDetails = "") {
    if (taskDetails) {
        document.querySelectorAll("input")[0].value = taskDetails.title;
        document.querySelectorAll("textarea")[0].value = taskDetails.description;
        document.querySelectorAll("input")[1].value = taskDetails.expiryDate;
        document.querySelectorAll("input")[2].value = taskDetails.priorty;

    } else {
        document.querySelectorAll("input")[0].value = "";
        document.querySelectorAll("textarea")[0].value = "";
        document.querySelectorAll("input")[1].value = "";
        document.querySelectorAll("input")[2].value = "";
    }
}

function addFormData(checkOp, taskDetails) {
    let formData = {}

    if (checkOp == "add") {
        formData.title = document.querySelectorAll("input")[0].value
        formData.description = document.querySelectorAll("textarea")[0].value
        formData.expiryDate = document.querySelectorAll("input")[1].value
        formData.priorty = document.querySelectorAll("input")[2].value
        formData.date = new Date();
        formData.id = Date.now();
        formData.editDate = null;
    } else {
        formData.title = document.querySelectorAll("input")[0].value
        formData.description = document.querySelectorAll("textarea")[0].value
        formData.expiryDate = document.querySelectorAll("input")[1].value
        formData.priorty = document.querySelectorAll("input")[2].value
        formData.date = taskDetails.date;
        formData.id = taskDetails.id;
        formData.editDate = new Date();
    }

    return formData;
}

function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem("data"));
    let task = null;
    let sectionTask = document.querySelector("#task");

    if (tasks != null) {
        tasks.forEach(item => {
            createTaskOverviewElement(task, item, sectionTask);
        });
    }
}

function createTaskOverviewElement(task, item, sectionTask) {
    task = document.createElement("article");
    task.className = "task";
    task.textContent = item.description.length > 400 ? item.description.slice(0, 399) + " ..." : item.description;
    task.taskId = item.id;
    task.id = item.id;
    sectionTask.appendChild(task);
    task.addEventListener("click", taskFn)
}

export {
    setFlag,
    setTaskFlag,
    changeInput,
    displayTasks,
    addFormData,
    createTaskOverviewElement
}

