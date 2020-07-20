import './import/polyfill'
import './import/svg4everybody'
import './import/lazyLoad'
import './import/objectFitImages'
import './import/dragstart'
import viewportOnMobile from './modules/viewportOnMobile'
import switcherThemes from './modules/switcherThemes'
import modals from './modules/modal'
// import smoothScroll from './modules/scroll-anchors'

window.addEventListener('DOMContentLoaded', () => {
  ;('use strict')

  switcherThemes()

  viewportOnMobile()

  modals()
})
