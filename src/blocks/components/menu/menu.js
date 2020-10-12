import { closestItemByClass, scrolLock, bodyScrollControl,getScroll, renderHumburger } from '../../../js/modules/utils'

export default class Menu {
  constructor(options) {
    this.h = document.querySelector(options.elementHamburger)
    this.nav = document.querySelector(options.nav)

    this.init()
  }

  init() {
    this.setup()
    this.listeners()
  }

  setup() {
    this.isOpen = false
    this.isAnimated = false
    this.isCreateHamburger = false
    this.overlay = document.querySelector('.overlay')

    if (!this.h) {
      throw new Error('Опция обязательна: elementHamburger')
    }

    if (!this.nav) {
      throw new Error('Опция обязательна: nav')
    }

    if (!this.overlay) {
     this.overlay = document.createElement('div');
     this.overlay.classList.add('overlay');
     document.body.appendChild(this.overlay)
    } else {
     this.overlay = document.querySelector('.overlay')
    }

    if (!this.isCreateHamburger) {
     renderHumburger()
     this.nav.insertAdjacentHTML('beforeend', renderHumburger())
     this.isCreateHamburger = true
    }
  }

  listeners() {
    document.addEventListener('click', (e) => {
      if (!closestItemByClass(e.target, 'hamburger')) {
        return
      }

      e.preventDefault()

      if (closestItemByClass(e.target, 'hamburger') && !this.isOpen) {
        this.open()
      } else {
        this.close()
      }
    })

    this.overlay.addEventListener('click', () => {
      if (!this.isOpen) {
        return
      }

      this.close()

      document.querySelectorAll('.hamburger').forEach(h => {
        h.classList.remove('hamburger--open')
      })
    })


    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992 && this.isOpen) {
        this.nav.classList.remove('menu-open')
        this.overlay.classList.remove("overlay--show")
        document.querySelectorAll('.hamburger').forEach(h => {
          h.classList.remove('hamburger--open')
        })
        scrolLock()
        this.isOpen = false
        this.isAnimated = false
      }
    })
  }
  open() {
    this.nav.classList.remove('menu-close')
    this.nav.classList.add('menu-open')
    this.overlay.classList.add("overlay--show")
    this.overlay.classList.add("overlay-menu")

    if (!this.isOpened && getScroll('Height')) {
      bodyScrollControl()
    }

    scrolLock()
    this.isOpen = true
  }

  close() {
    this.isAnimated = true
    this.nav.classList.add('menu-close')
    this.overlay.classList.add("overlay--hide")
    bodyScrollControl()
    scrolLock()
    this.isOpen = false
    this.nav.addEventListener('transitionend', this.transitionend.bind(this))
  }

  transitionend(e) {
      this.nav.removeEventListener('transitionend', this.transitionend.bind(this))

      if (this.isAnimated && e.srcElement == this.nav) {
        this.nav.removeEventListener('transitionend', this.transitionend.bind(this))
        this.nav.classList.remove('menu-open')
        this.overlay.classList.remove("overlay--show")
        this.overlay.classList.remove("overlay--hide")
        this.isOpen = false
        this.isAnimated = false
      }
  }
}