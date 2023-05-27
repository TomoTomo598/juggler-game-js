import { createListItems, createSubElement } from "@/utils/dom/ease_edit_dom";
import store from "../../../utils/store";

export class Handle {
    static CASHE_BUTTON_VALUE = ['x 100', 'x 10', 'cash'];
    static BUTTON_ITEMS_SUBDOM = [
        {
            name: 'button',
            children: [{ name: 'span', text: 1 }],
            on: ['click', function() { store.actLeanFlag[0] = 0 }],
        },
        {
            name: 'button',
            children: [{ name: 'span', text: 2 }],
            on: ['click', function() { store.actLeanFlag[1] = 0 }],
        },
        {
            name: 'button',
            children: [{ name: 'span', text: 3 }],
            on: ['click', function() { store.actLeanFlag[2] = 0 }],
        },
    ];
    static CASHE_ITEMS_SUBDOM = [
        {
            name: 'button',
            text: Handle.CASHE_BUTTON_VALUE[0],
        },
        {
            name: 'button',
            text: Handle.CASHE_BUTTON_VALUE[1],
        },
        {
            name: 'button',
            text: Handle.CASHE_BUTTON_VALUE[2],
        },
    ];

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
    // slot cashe list
    get casheListItems() {
        const fragment = document.createDocumentFragment();
        const children = Handle.CASHE_ITEMS_SUBDOM.map(child => createSubElement(child));
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
    // slot button list
    get buttonListItems() {
        const fragment = document.createDocumentFragment();
        const children = Handle.BUTTON_ITEMS_SUBDOM.map(child => createSubElement(child));
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