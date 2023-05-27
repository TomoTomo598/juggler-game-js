export class Score {
    static SCORE_ITEMS_TITLE = ['CREDIT', 'COUNT', 'PAYOUT']
    static SCORE_ITEMS_ID = ['credit', 'count', 'payout']
    // informal data
    static SCORE_ITEMS_VALUE = [500, 20, 1080]
    // element: score
    section = document.createElement('section')
    scoreList = document.createElement('ul')
    // component fragument
    fragument = document.createDocumentFragment()
    // DOM template: score
    constructor() {
        // add class
        this.section.classList.add('scoreSection')
        this.scoreList.classList.add('scoreList')
        
        this.section.appendChild(this.scoreList)
        this.scoreList.appendChild(this.scoreItems)
        // append fragument as child to parent...
        this.fragument.appendChild(this.section)
        return this.fragument
    }
    get scoreItems() {
        const fragument = document.createDocumentFragment()
        for (let i = 0; i < Score.SCORE_ITEMS_TITLE.length; i++) {
            const scoreItem = document.createElement('li')
            const scoreTitle = document.createElement('h3')
            const scoreValue = document.createElement('p')
            scoreItem.insertAdjacentElement('beforeend', scoreTitle)
            scoreItem.insertAdjacentElement('beforeend', scoreValue)
            // class & id
            scoreItem.classList.add(Score.SCORE_ITEMS_ID[i])
            scoreItem.id = Score.SCORE_ITEMS_ID[i]
            // add title
            scoreTitle.insertAdjacentText('beforeend', Score.SCORE_ITEMS_TITLE[i] + ':')
            // add value...
            scoreValue.textContent = Score.SCORE_ITEMS_VALUE[i]
            // add to fragument
            fragument.appendChild(scoreItem)
        }
        return fragument
    }
}