document.querySelector("#menu").addEventListener("click", menuShowFn)

function menuShowFn() {
    document.querySelector("#menu-modal").classList.toggle("hidden-menu");
}

document.querySelector("#blur").addEventListener("click", menuHideFn)

function menuHideFn () {
    document.querySelector("#menu-modal").classList.toggle("hidden-menu");
}

