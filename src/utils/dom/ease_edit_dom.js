export function createListItems({ name ,className, idName, length, subElements }) {
    const fragment = document.createDocumentFragment()
    for (let i=0; i<length; i++) {
        // list item
        const item = document.createElement(name)
        item.classList.add(className)
        item.id = idName + '-' + (i+1)
        // sub element
        if (subElements[i] instanceof Node) {
            item.appendChild(subElements[i])
        } else console.log("createListItems: subElements[" + i + "] is not type of Node.")
        fragment.appendChild(item)
    }
    return fragment
}

export function createSubElement(obj) {
    let subElement
    const fragment = document.createDocumentFragment()
    if (obj.name) subElement = document.createElement(obj.name)
    if (obj.name && obj.className) subElement.className = obj.className
    if (obj.name && obj.id) subElement.id = obj.id
    if (obj.name && obj.on && Array.isArray(obj.on)) {
        const handles = obj.on
        subElement instanceof Node && subElement.addEventListener(handles[0], handles[1])
    }
    if (obj.name && obj.attrs) {
        obj.attrs.forEach(function (attr) {
            for (const [key, val] of Object.entries(attr)) {
                subElement.setAttribute(key, val)
            }
        })
    }
    if (obj.name !== undefined && obj.text) subElement.textContent = obj.text
    if (obj.name !== undefined && Array.isArray(obj.children) && obj.children.length !== 0) {
        for (const child of obj.children) {
            subElement.appendChild(createSubElement(child))
        }
    }
    if (subElement && subElement instanceof Node) fragment.appendChild(subElement)
    if (fragment.childNodes.length === 0) return false
    return fragment
}