const tooltip = document.createElement("div");
tooltip.id = "tooltip"
tooltip.style.position = "absolute"
tooltip.className = "task-hidden"
document.body.appendChild(tooltip)

function setTooltip(currentElement, content) {
    tooltip.textContent = content;
    tooltip.classList.toggle("task-hidden")
    console.log(currentElement)
    let rect = currentElement.getBoundingClientRect();
    tooltip.style.top = `${rect.top + rect.height}px`
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`
}

export {
    setTooltip
}