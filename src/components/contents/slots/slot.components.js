import { SLOT_SYMBOL } from "@/constants/symbol.constant";
import { createListItems } from "@/utils/dom/ease_edit_dom";
import $ from "@/utils/dom/select_dom_node";
 import store from "../../../utils/store";
import { Handle } from "@/components/contents/handles/handle.components";
export class Slot {
    // constant num
    static SLOT_LEAN_NUM = 3;
    static SLOT_CHAR_NUM = 7;
    static ONEBOX_HEIGHT = 50;
    // element
    container = document.createElement('section');
    handle = new Handle();
    // display
    headingDisplay = document.createElement('div');
    slotDisplay = document.createElement('div');
    // fragment
    fragment = document.createDocumentFragment();
    // DOM template: slot
    constructor() {
        // set state
        store.commit('slotRotation', this.slotRotation);
        store.subscribe('actLeanFlag', function() {
            store.dispatch('slotRotation');
        });

        for (let i=0; i<3; i++) {
            store.subscribe(`interval${i + 1}`, function() {
                const currentI = store[`interval${i + 1}`];
                const historyI = store.history.map((o) => o[`interval${i + 1}`]);
                if (!Object.is(currentI, historyI)) store.dispatch('slotRotation');
                else store.dispatch('slotRotation');
            });
        }

        store.eachBoxY = [];

        // add class
        this.container.classList.add('slotContainer');
        this.headingDisplay.classList.add('headingDisplay');
        this.slotDisplay.classList.add('slotDisplay');
        // append
        this.container.insertAdjacentElement('beforeend', this.headingDisplay);
        this.container.insertAdjacentElement('beforeend', this.slotDisplay);
        this.slotDisplay.appendChild(this.slotLists);
        // append handle to end
        this.container.appendChild(this.handle);
        // append fragment as child to parent...
        this.fragment.appendChild(this.container);
        return this.fragment;
    }
    // slot lists
    get slotLists() {
        const fragment = document.createDocumentFragment();
        const SlotItemsElementsCollection = [
            this.slotItems,
            this.slotItems,
            this.slotItems,
        ];
        const items = createListItems({
            name: 'ul',
            className: 'slotLists',
            idName: 'lean',
            length: Slot.SLOT_LEAN_NUM,
            subElements: SlotItemsElementsCollection
        });
        fragment.appendChild(items);
        return fragment;
    }
    get slotItems() {
        const fragment = document.createDocumentFragment();
        for (let i=0; i<Slot.SLOT_CHAR_NUM; i++) {
            const item = document.createElement('li');
            const iconTxt = document.createElement('p');
            const initialHeight = Slot.ONEBOX_HEIGHT * i;
            store.eachBoxY.push(initialHeight);
            item.style.setProperty('top', `${initialHeight}px`);
            item.insertAdjacentElement('beforeend', iconTxt);
            iconTxt.textContent = SLOT_SYMBOL[i];
            // add to fragment
            fragment.appendChild(item);
        }
        return fragment;
    }
    // slot rotation controll
    slotRotation() {
        // lean keys

        for (let i=0; i<3; i++) {
            const lists = $('slotDisplay');
            const list = lists.childNodes[i];
            const items = Array.prototype.slice.call(list.childNodes);
            if (!store[`interval${i+1}`]) {
                const intervalID = setInterval(() => {
                    items.map((item, index) => {
                        if (store.eachBoxY[index] > Slot.ONEBOX_HEIGHT * (Slot.SLOT_CHAR_NUM - 1)) store.eachBoxY[index] = - Slot.ONEBOX_HEIGHT;
                        else store.eachBoxY[index] += 5;
                        item.style.setProperty('top', `${store.eachBoxY[index]}px`);
                    });
                }, 50);
                store[`interval${i+1}`] = intervalID;
                console.log(store.interval1, store.interval2, store.interval3);
            } else if (!element && store.intervalID[i]) {
                clearInterval(store[`interval${index+1}`]);
                store.intervalID[index+1] = null;
            }
            
        }

        
        
    }
}