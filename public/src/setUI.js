import { createModal, createTaskOverviewElement } from "./createUI.js";
import { setFlag, quill } from "./varibles.js";
import { taskDetails,setTaskDetails } from "./varibles.js";

let addBtn = document.querySelector("#add-btn");
addBtn.addEventListener("click", addBtnFn);

function addBtnFn(e) {
    let flag = setFlag();

    if (flag === 1) {
        createModal();
    }
    window.visualViewport.addEventListener('resize', repositionToolbar);
    window.visualViewport.addEventListener('scroll', repositionToolbar);

    document.querySelector("#submit").opVal = "add"

    toggleClass();
}

function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem("data"));

    if (tasks != null) {
        tasks.forEach(item => {
            createTaskOverviewElement(item);
        });
    }
}

function toggleClass() {
    document.querySelectorAll(".other")[0].classList.toggle("task-hidden");
    document.querySelectorAll(".other")[1].classList.toggle("task-hidden");
    document.querySelector("#modal").classList.toggle("task-hidden");
    document.querySelector("#modal").classList.toggle("modal");
    document.querySelector("#task").classList.toggle("task-hidden");
}

function setModal(taskDetails) {
    let title = document.querySelector("#title");
    title.value = taskDetails.title;

    // let creationDate = document.getElementById("task-creation-date");
    // let date = new Date(taskDetails.date)
    // creationDate.textContent = date.toUTCString();

    quill.clipboard.dangerouslyPasteHTML(taskDetails.description);

    // let expiryDate = document.getElementById("task-expiry");
    // expiryDate.innerHTML = `<span class="h">Deadline:</span> <span class="dl"> ${taskDetails.expiryDate} </span>`;

    // let priorty = document.getElementById("task-priorty");
    // priorty.innerHTML = `<span class="h">Priority:</span> <span class="dl"> ${taskDetails.priorty}</span>`;
}

function changeInput() {
    document.querySelectorAll("input")[0].value = "";
    quill.deleteText(0, quill.getLength());
    document.querySelectorAll("input")[1].value = "";
    document.querySelectorAll("input")[2].value = "";
}

function taskFn(e) {
    let taskId = e.currentTarget.taskId;
    setTaskDetails(JSON.parse(localStorage.getItem("data")).find((item) => item.id === taskId));

    let flag = setFlag();
    if (flag == 1) {
        createModal()
    }

    setModal(taskDetails);
    toggleClass();

    document.querySelector("#submit").opVal = "edit"
    
    const title = document.querySelector("#title")
    const editor = document.querySelector(".ql-editor")
    title.readOnly = true;
    editor.contentEditable = false;

    title.addEventListener("click", inputEditable);
    editor.addEventListener("click", inputEditable);

    function inputEditable() {
        title.readOnly = false;
        editor.contentEditable = true;
    }
}

function repositionToolbar() {
    const toolbar = document.querySelector(".final-outer-wrapper");
    const keyboardHeight = window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop;
    
    toolbar.style.bottom = keyboardHeight + 'px';
}

export {
    displayTasks,
    taskFn,
    changeInput,
    toggleClass
}