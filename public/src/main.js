let addBtn = document.querySelector("#add-btn")
addBtn.addEventListener("click", addBtnFn)

let flag = 0;
let popStateFlag = false
let taskLeftColumnFlag = true;
let quill = null

let taskDetails = {
    title: null,
    description: null,
    expiryDate: null,
    date: null,
    editDate: null,
    priority: null,
    id: null
};

function setFlag() {
    return ++flag;
}

displayTasks();

function repositionToolbar() {
    const toolbar = document.querySelector(".final-outer-wrapper");
    const keyboardHeight = window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop;
    // alert(`${window.innerHeight}, ${window.visualViewport.height}, ${window.visualViewport.offsetTop}`)
    // If keyboard is open, move toolbar up

    toolbar.style.bottom = keyboardHeight + 'px';

}

function changeInput() {
    document.querySelectorAll("input")[0].value = "";
    quill.deleteText(0, quill.getLength());
    document.querySelectorAll("input")[1].value = "";
    document.querySelectorAll("input")[2].value = "";
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

function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem("data"));

    if (tasks != null) {
        tasks.forEach(item => {
            createTaskOverviewElement(item);
        });
    }
}

function createTaskOverviewElement(item) {
    let taskLeft = document.querySelector("#task-left");
    let taskRight = document.querySelector("#task-right");

    let task = document.createElement("article");
    task.className = "task";
    task.taskId = item.id;
    task.id = item.id;

    let para = document.createElement("p");
    let title = document.createElement("h4");

    let taskDescription = document.createElement("div");
    taskDescription.innerHTML = item.description
    taskDescription = taskDescription.textContent

    para.textContent = taskDescription.length > 400 ? taskDescription.slice(0, 399) + " ..." : taskDescription;
    title.textContent = item.title.length > 50 ? item.title.slice(0, 50) + " ___" : item.title

    task.appendChild(title)
    task.appendChild(para)
    if (taskLeftColumnFlag) {
        taskLeft.prepend(task);
        taskLeftColumnFlag = !taskLeftColumnFlag
    } else {
        taskRight.prepend(task);
        taskLeftColumnFlag = !taskLeftColumnFlag
    }
    task.addEventListener("click", taskFn)
}

function addBtnFn(e) {
    flag = setFlag();

    if (flag === 1) {
        createModal();
    }
    window.visualViewport.addEventListener('resize', repositionToolbar);
    window.visualViewport.addEventListener('scroll', repositionToolbar);

    document.querySelector("#submit").opVal = "add"

    toggleClass();
}

function taskFn(e) {
    let taskId = e.currentTarget.taskId;
    taskDetails = JSON.parse(localStorage.getItem("data")).find((item) => item.id === taskId);

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

function createModal() {
    let modal = document.createElement("div");
    modal.className = "modal-inner"

    let form = document.createElement("form");
    form.className = "modal-form"
    form.id = "form"
    form.addEventListener("submit", submitFn);

    let InputWrapper = document.createElement("div");
    InputWrapper.className = "wrapper-top-1"

    let InputWrapper2 = document.createElement("div");
    InputWrapper2.className = "wrapper-top-2"
    InputWrapper.appendChild(InputWrapper2)

    let inputName = document.createElement("input");
    inputName.type = "text"
    inputName.id = "title"
    inputName.required = true
    inputName.placeholder = "Title"

    const editorDiv = document.createElement('div');
    editorDiv.id = 'editor';

    let mainWrapper = document.createElement("div");
    mainWrapper.className = "main-wrapper";

    const copyBtn = document.createElement("button");
    copyBtn.type = "button"
    copyBtn.id = "copy-btn"
    copyBtn.className = "copy-btn"
    copyBtn.innerHTML = `<span class="material-symbols-outlined">content_copy</span>`
    copyBtn.addEventListener("click", (e) => {
        const html = `<h1>${inputName.value}</h1> ${quill.getSemanticHTML(0, quill.getLength())}`
        const text = `${inputName.value} ${quill.getText(0, quill.getLength())}`

        const blobInput = new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([text], { type: "text/plain" })
        });

        navigator.clipboard.write([blobInput])
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    })

    let inputDate = document.createElement("input");
    inputDate.type = "date"
    inputDate.id = "date"

    const inputDateBtn = document.createElement("button");
    inputDateBtn.type = "button"
    inputDateBtn.id = "date-btn"
    inputDateBtn.className = "date-btn"
    inputDateBtn.innerHTML = `<span class="material-symbols-outlined">event</span>`
    inputDateBtn.appendChild(inputDate);
    inputDateBtn.addEventListener("click", () => {
        inputDate.click();
    })

    let priorty = document.createElement("input");
    priorty.type = "number";
    priorty.min = 1;
    priorty.id = "priorty"
    priorty.placeholder = "Priorty"

    const inputPriortyBtn = document.createElement("button");
    inputPriortyBtn.type = "button"
    inputPriortyBtn.id = "priorty-btn"
    inputPriortyBtn.className = "priorty-btn"
    inputPriortyBtn.innerHTML = `<span class="material-symbols-outlined priorty-btn">low_priority</span>`
    inputPriortyBtn.appendChild(priorty);
    inputPriortyBtn.addEventListener("click", () => {
        //
    })

    let priortyDateWrapper = document.createElement("div");
    priortyDateWrapper.className = "priorty-date-wrapper";

    priortyDateWrapper.appendChild(copyBtn)
    priortyDateWrapper.appendChild(inputDateBtn)
    priortyDateWrapper.appendChild(inputPriortyBtn)

    let submit = document.createElement("button");
    submit.type = "submit";
    submit.innerHTML = `<span class="material-symbols-outlined save">save</span>`;
    submit.id = "submit";

    let cancel = document.createElement("button");
    cancel.type = "button";
    cancel.innerHTML = `<span class="material-symbols-outlined cancel">arrow_back_ios </span>`;
    cancel.id = "cancel";
    cancel.addEventListener("click", submitFn);

    let finalLastWrapper = document.createElement("div");
    finalLastWrapper.className = "final-last-wrapper";
    finalLastWrapper.id = "quill-toolbar";
    finalLastWrapper.innerHTML = `
  <span class="ql-formats">
    <button class="ql-bold"></button>
    <button class="ql-italic"></button>
    <button class="ql-underline"></button>
  </span>
  <span class="ql-formats">
    <button class="ql-list" value="ordered"></button>
    <button class="ql-list" value="bullet"></button>
  </span>
  <span class="ql-formats">
    <button class="ql-link"></button>
    <button class="ql-code-block"></button>
  </span>
`;

    document.querySelector("#modal").appendChild(modal);
    modal.appendChild(form);
    form.appendChild(InputWrapper);
    form.appendChild(mainWrapper);
    mainWrapper.appendChild(inputName);
    mainWrapper.appendChild(editorDiv);
    InputWrapper2.appendChild(cancel)
    InputWrapper2.appendChild(priortyDateWrapper);

    quill = new Quill(editorDiv, {
        theme: 'snow',
        placeholder: "Note",
        modules: {
            toolbar: {
                container: finalLastWrapper
            },
            history: {
                delay: 2500,
                userOnly: true
            },
            clipboard: {
                matchers: []
            }
        }
    });

    let lastWrapper = document.createElement("div");
    lastWrapper.className = "last-wrapper";

    let moreBtn = document.createElement("button");
    moreBtn.innerHTML = `<span class="material-symbols-outlined more">more_vert</span>`
    moreBtn.type = "button"

    let undoBtn = document.createElement("button");
    undoBtn.innerHTML = `<span class="material-symbols-outlined undo">undo</span>`
    undoBtn.type = "button"

    let redoBtn = document.createElement("button");
    redoBtn.innerHTML = `<span class="material-symbols-outlined redo">redo</span>`
    redoBtn.type = "button"

    let finalOuterWrapper = document.createElement("div");
    finalOuterWrapper.className = "final-outer-wrapper";

    finalOuterWrapper.appendChild(finalLastWrapper);
    finalOuterWrapper.appendChild(lastWrapper);

    lastWrapper.appendChild(undoBtn);
    lastWrapper.appendChild(redoBtn);
    lastWrapper.appendChild(submit);
    lastWrapper.appendChild(moreBtn);

    form.appendChild(finalOuterWrapper);

    redoBtn.addEventListener("click", () => {
        quill.history.redo()
    })

    undoBtn.addEventListener("click", () => {
        quill.history.undo()
    })

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
}

// function cancelFn(e) {
//     e.preventDefault();
//     toggleClass();
//     changeInput();

// }

