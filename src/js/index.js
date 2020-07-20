import './import/polyfill'
import './import/svg4everybody'
import './import/lazyLoad'
import './import/objectFitImages'
import './import/dragstart'
import viewportOnMobile from './modules/viewportOnMobile'
import switcherThemes from './modules/switcherThemes'
import modals from './modules/modal'
import select from '../blocks/components/select/select'
import swiperSlider from '../blocks/components/slider/slider'
import hamburger from '../blocks/components/hamburger/hamburger'
// import smoothScroll from './modules/scroll-anchors'

window.addEventListener('DOMContentLoaded', () => {
  ;('use strict')

  switcherThemes()

  viewportOnMobile()

  modals()

  select()

  swiperSlider()

  hamburger()
})
