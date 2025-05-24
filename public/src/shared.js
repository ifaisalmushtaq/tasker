import { setFlag, setTaskFlag } from "./flag";
import { createModal, toggleClass, createTaskModal, setTaskModal } from "./uiFns";


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

export {
    addBtnFn,
    taskFn
}