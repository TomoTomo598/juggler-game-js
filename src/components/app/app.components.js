import { Score } from "../contents/scores/score.components"
import { Slot } from "../contents/slots/slot.components"
import { Header } from "../header/header.components"

export class App {

    // Element:
    app = document.querySelector('#app')
    main = document.createElement('main')    
    constructor() {
        // contents
        this.main.append(
            new Score(),
            new Slot()
        )
        // root
        this.app.append(
            new Header(),
            this.main
        )
    }
}