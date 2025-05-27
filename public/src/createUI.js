import { submitFn } from "./dataHandle.js";
import { taskFn } from "./setUI.js";
import { taskLeftColumnFlag, toggleTaskLeftColumnFlag } from "./varibles.js";
import { quill, setQuill } from "./varibles.js";
import { setTooltip } from "./tooltip.js";

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
        toggleTaskLeftColumnFlag()
    } else {
        taskRight.prepend(task);
        toggleTaskLeftColumnFlag()
    }
    task.addEventListener("click", taskFn)
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

    copyBtn.addEventListener("click", copyToClipboard);

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

    setQuill(editorDiv, finalLastWrapper)

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

    function copyToClipboard(e) {
    const currentElement = e.currentTarget

    const html = `<h1>${inputName.value}</h1> ${quill.getSemanticHTML(0, quill.getLength())}`
    const text = `${inputName.value} ${quill.getText(0, quill.getLength())}`

    const blobInput = new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([text], { type: "text/plain" })
    });

    navigator.clipboard.write([blobInput])
        .then(() => {
            setTooltip(currentElement, "Copied !")
        })
        .catch(err => {
            setTooltip(currentElement, "Could Not Copy !")
        });
}
}

export {
    createTaskOverviewElement,
    createModal
}