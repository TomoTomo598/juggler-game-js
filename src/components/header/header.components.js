import logo from '@/assets/header-logo.png'
import { BASIC_SYMBOL } from '../../constants/symbol.constant'
export class Header {
    static MY_COIN_QUONTITY
    static MY_MEDAL_QUONTITY
    static REPOSITRY_URL = 'https://github.com/TomoTomo598/slot-machine-js'
    // elements: header
    header = document.createElement('header')
    // left side
    headerLogoContent = document.createElement('div')
    headerLogo = document.createElement('img')
    // right side
    headerCasheContent = document.createElement('div')
    headerMyCoin = document.createElement('p')
    headerMyMedal = document.createElement('p')

    // values
    headerMyCoinVal = 100
    headerMyMedalVal = 0
    // component fragment
    fragment = document.createDocumentFragment()
    // DOM template: header
    constructor() {
        // add class
        this.header.classList.add('header')
        this.headerLogoContent.classList.add('headerLogoContent')
        this.headerLogo.classList.add('headerLogo')
        this.headerCasheContent.classList.add('headerCasheContent')
        this.headerMyCoin.classList.add('headerMyCoin')
        this.headerMyMedal.classList.add('headerMyMedal')
        // header logo content
        this.header.appendChild(this.headerLogoContent)
        this.headerLogoContent.appendChild(this.headerLogo)
        // header logo source
        this.headerLogo.src = logo
        this.headerLogo.width = 100 * 1.5
        // header cashe content
        this.header.appendChild(this.headerCasheContent)
        this.headerCasheContent.append(this.headerMyCoin, this.headerMyMedal)
        // set cashe value
        this.headerMyCoin.textContent = BASIC_SYMBOL[1] + ' ' + this.headerMyCoinVal
        this.headerMyMedal.textContent = BASIC_SYMBOL[0] + ' ' + this.headerMyMedalVal
        // append fragment as child to parent...
        this.fragment.appendChild(this.header)
        return this.fragment
    }
}