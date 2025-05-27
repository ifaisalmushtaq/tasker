import { toggleClass, changeInput } from "./setUI.js"
import { createTaskOverviewElement } from "./createUI.js";
import { taskDetails,quill } from "./varibles.js";

function submitFn(e) {
    e.preventDefault();

    let checkOp = document.querySelector("#submit").opVal;
    let formInputData = addFormData(checkOp, taskDetails);

    if (!formInputData) {
        toggleClass();
        changeInput();
        return;
    }

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

    createTaskOverviewElement(formInputData)
    toggleClass();
    changeInput();
    quill.history.clear();
}

function addFormData(checkOp, taskDetails) {
    let formData = {}

    if (checkOp == "add") {
        formData.title = document.querySelector("#title").value
        formData.description = quill.getSemanticHTML(0, quill.getLength());

        if (!formData.title && formData.description == "<p></p>") {
            return null
        }

        //formData.expiryDate = document.querySelectorAll("input")[1].value
        //formData.priorty = document.querySelectorAll("input")[2].value
        formData.date = new Date();
        formData.id = Date.now();
        formData.editDate = null;
    } else {
        formData.title = document.querySelector("#title").value
        formData.description = quill.getSemanticHTML(0, quill.getLength());
        //formData.expiryDate = document.querySelectorAll("input")[1].value
        //formData.priorty = document.querySelectorAll("input")[2].value
        formData.date = taskDetails.date;
        formData.id = taskDetails.id;
        formData.editDate = new Date();
    }

    return formData;
}

export {
    submitFn
}