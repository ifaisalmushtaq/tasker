let flag = 0;
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

function setTaskDetails (taskDetail) {
    taskDetails = taskDetail
}

function toggleTaskLeftColumnFlag () {
    taskLeftColumnFlag = !taskLeftColumnFlag;
    return taskLeftColumnFlag
}

function setFlag() {
    return ++flag;
}

function setQuill(editorDiv, toolbarDiv) {
    quill = new Quill(editorDiv, {
        theme: 'snow',
        placeholder: "Note",
        modules: {
            toolbar: {
                container: toolbarDiv
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
}

export {
    setFlag,
    quill,
    taskDetails,
    taskLeftColumnFlag,
    setQuill,
    toggleTaskLeftColumnFlag,
    setTaskDetails
}
