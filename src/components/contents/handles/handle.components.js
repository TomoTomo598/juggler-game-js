import { createListItems, createSubElement } from "@/utils/dom/ease_edit_dom";
import store from "../../../utils/store";

export class Handle {
    static CASHE_BUTTON_VALUE = ['x 100', 'x 10', 'cash'];
    static BUTTON_ITEM_VALUE = [1, 2, 3];
    
    
    buttonElements = {
        name: 'button',
        children: [{ name: 'span', text: Handle.BUTTON_ITEM_VALUE }],
        on: ['click', this.compareIntervalStatement],
    };
        
    casheElements = {
        name: 'button',
        text: Handle.CASHE_BUTTON_VALUE,
    }

    // init functions
    respondHandleButtonSubdom(element, loop) {
        const resArray = [];
        let forArray, childTemplate, arrayKey = [];
        let resTemplate = {};

        Object.keys(element).forEach(key => {
            arrayKey.push(key);
            if (!['on', 'children'].includes(key) && Array.isArray(element[key])) {
                forArray = element[key];
            }
            else if (key === 'children') {
                element[key].forEach(child => {
                    childTemplate = {};
                    Object.keys(child).forEach(key2 => {
                        childTemplate[key2] = child[key2];
                    });
                });
            }
        });
        for (let i = 0; i < loop; i++) {    
            arrayKey.forEach(key => {
                if (key === 'on' && typeof element[key][1] === 'function') element[key] = [element[key][0], element[key][1](i)];

                else if (!['on', 'children'].includes(key) && Array.isArray(element[key])) resTemplate[key] = forArray[i];
                
                else if (key === 'children') {
                    let array = [];
                    let template = {};

                    Object.keys(childTemplate).forEach(key2 => {
                        template[key2] = Array.isArray(childTemplate[key2]) ? childTemplate[key2][i] : childTemplate[key2];
                    });

                    array.push(template);
                    resTemplate[key] = array;
                }

                else resTemplate[key] = element[key];
            });

            resArray.push(resTemplate);
            resTemplate = {};
        }
        return resArray;
    };
    compareIntervalStatement(idx) {
        console.log(idx);

        const currentI = store[`interval${idx + 1}`];
        const historyI = store.history.map((o) => o[`interval${idx + 1}`]);
        if (Object.is(currentI, historyI)) store[`interval${idx + 1}`] = historyI;
        else store[`interval${idx + 1}`] = currentI;
    };

    // content
    container = document.createElement('section');
    buttonContent = document.createElement('div');
    leverContent = document.createElement('div');
    casheContent = document.createElement('div');
    // list
    casheList = document.createElement('ul');
    buttonList = document.createElement('ul');
    // parts of lever
    leverBall = document.createElement('div');
    // fragment
    fragment = document.createDocumentFragment();
    // DOM template: handle
    constructor() {
        // add class
        this.container.classList.add('handleSection');
        this.buttonContent.classList.add('buttonContent');
        this.leverContent.classList.add('leverContent');
        this.casheContent.classList.add('casheContent');
        this.leverBall.classList.add('leverBall');
        // append
        this.container.insertAdjacentElement('beforeend', this.leverContent);
        this.container.insertAdjacentElement('beforeend', this.buttonContent);
        this.container.insertAdjacentElement('beforeend', this.casheContent);
        this.leverContent.insertAdjacentElement('beforeend', this.leverBall);
        this.buttonContent.insertAdjacentElement('beforeend', this.buttonList);
        this.casheContent.insertAdjacentElement('beforeend', this.casheList);
        this.casheList.appendChild(this.casheListItems);
        this.buttonList.appendChild(this.buttonListItems);
        // append fragment as child to parent...
        this.fragment.appendChild(this.container);
        // eventlistener
        this.leverBall.addEventListener('mousedown', this.leverDrag);
        // return fragment
        return this.fragment;
    }
    // slot button list
    get buttonListItems() {
        const fragment = document.createDocumentFragment();
        const resArray = this.respondHandleButtonSubdom(this.buttonElements, 3);
        const children = resArray.map(child => createSubElement(child));
        const items = createListItems({
            name: 'li',
            className: 'buttonListItems',
            idName: 'btn',
            length: 3,
            subElements: children
        });
        fragment.appendChild(items);
        return fragment;
    }
    // slot cashe list
    get casheListItems() {
        const fragment = document.createDocumentFragment();
        const resArray = this.respondHandleButtonSubdom(this.casheElements, 3);
        const children = resArray.map(child => createSubElement(child));
        const items = createListItems({
            name: 'li',
            className: 'casheListItems',
            idName: 'cashe-btn',
            length: 3,
            subElements: children
        });
        fragment.appendChild(items);
        return fragment;
    }
    // lever action event handler
    leverDrag(event) {
        const ball = this;
        event.preventDefault();
        ball.style.setProperty('z-index', 1000);
        // set ball's top
        let shiftY = event.clientY - ball.getBoundingClientRect().top;
        // add mouse moving event
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        // event handlers
        function onMouseMove(e) {
            let newY = e.clientY - shiftY - ball.parentElement.getBoundingClientRect().top;
            let bottomLine = ball.parentElement.offsetHeight;
            if (newY < 0) newY = 0;
            if (newY > bottomLine) newY = bottomLine;
            newY = newY;
            ball.style.setProperty('top', `${newY}px`);
        }
        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove); // set top 0
            ball.animate([
                { transform: `translate(-50%, ${ball.parentElement.offsetHeight - 20}px)` },
                { transform: 'translate(-50%, 0px)' },
            ], {
                duration: 50,
            });
            ball.style.setProperty('top', `${0}px`);
            store.actLeanFlag = [1,1,1];
            
        }
    }
}