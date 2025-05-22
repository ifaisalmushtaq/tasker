import { cancelFn, submitFn, editTaskFn, backFn} from "./eventhandlerfn";

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
    edit.textContent = "Edit";
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

export {
    createModal,
    toggleClass,
    createTaskModal,
    setTaskModal, 
}
