import {
  focusElements,
  getScroll,
  scrolLock,
  bodyScrollControl,
} from '../../../js/modules/utils'

export default class Modal {
  constructor(options) {
    this.triggers = document.querySelectorAll(options.trigger)
    this.modal = document.querySelector(options.modal)
    this.closeBnts = document.querySelectorAll(options.close)
    this.modalClassName = options.modal

    this.init()
  }

  init() {
    if (!this.modal) {
      return
    }

    this.setup()
    this.listeners()
  }

  setup() {
    this.isOpened = false
    this.isAnimated = false
    this.nextWindows = false
    this.firstTrigger = null
    this.currentModal = null
    this.overlay = document.querySelector('.overlay')
    this.focusElements = focusElements()

    if (!this.overlay) {
      this.overlay = document.createElement('div')
      this.overlay.classList.add('overlay')
      document.body.appendChild(this.overlay)
    } else {
      this.overlay = document.querySelector('.overlay')
    }
  }

  listeners() {
    if (this.triggers) {
      this.triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => this.open(trigger))
      })
    }

    this.closeBnts.forEach((cBtn) => {
      cBtn.addEventListener('click', this.close.bind(this))
    })

    document.querySelectorAll(this.modalClassName).forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target.classList.contains(this.modalClassName.slice(1))) {
          this.close()
        }
      })
    })

    window.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        this.isOpened &&
        this.currentModal.classList.contains('modal-open')
      ) {
        e.preventDefault()
        this.close()
      }

      if (e.key === 'Tab' && this.isOpened) {
        this.focusCatcher(e)
      }
    })
  }

  open(trigger) {
    this.isOpened = true

    let modalName =
      this.triggers.length != 0 ? trigger.dataset.trigger : this.modalClassName

    if (this.isOpened && !this.nextWindows) {
      this.firstTrigger = trigger
    }

    if (document.documentElement.classList.contains('scroll-lock')) {
      // Если окно уже открыто
      if (document.querySelector('.modal-open')) {
        document.querySelector('.modal-open').classList.remove('modal-open')
      }

      this.nextWindows = true
    }

    this.currentModal =
      this.triggers.length != 0
        ? document.querySelector(`#${modalName}`)
        : document.querySelector(`${modalName}`)

    if (this.isOpened && getScroll('Height')) {
      bodyScrollControl()
    }

    this.currentModal.classList.add('modal-open')
    this.overlay.classList.add('overlay--show')

    if (!this.nextWindows) {
      scrolLock()
      this.nextWindows = true
    }
    this.focusContol()
  }

  close() {
    if (!this.isOpened) {
      return
    }

    this.isAnimated = true
    this.nextWindows = false
    this.overlay.classList.add('overlay--hide')

    document.querySelectorAll(this.modalClassName).forEach((modal) => {
      modal.classList.add('modal-close')
      modal.addEventListener('transitionend', this.transitionend.bind(this))
    })
  }

  transitionend(e) {
    this.currentModal.removeEventListener(
      'transitionend',
      this.transitionend.bind(this)
    )

    if (
      this.isAnimated &&
      e.target.classList.contains('modal__window') &&
      e.propertyName == 'transform'
    ) {
      document.querySelectorAll(this.modalClassName).forEach((modal) => {
        modal.classList.remove('modal-close')
        modal.classList.remove('modal-open')
      })

      bodyScrollControl()
      scrolLock()
      this.focusContol()

      this.overlay.classList.remove('overlay--show')
      this.overlay.classList.remove('overlay--hide')
      this.isOpened = false
      this.isAnimated = false
    }
  }

  focusContol() {
    const nodes = this.currentModal.querySelectorAll(this.focusElements)

    if (this.isOpened) {
      if (nodes.length) {
        setTimeout(() => {
          nodes[0].focus()
        }, 100)
      }
    }

    if (this.firstTrigger) {
      this.firstTrigger.focus()
    }
  }

  focusCatcher(e) {
    const nodes = this.currentModal.querySelectorAll(this.focusElements)
    const nodesArray = Array.prototype.slice.call(nodes)

    if (!this.currentModal.contains(document.activeElement)) {
      nodesArray[0].focus()
      e.preventDefault()
    } else {
      const focusedItemIndex = nodesArray.indexOf(document.activeElement)
      if (e.shiftKey && focusedItemIndex === 0) {
        setTimeout(() => {
          nodesArray[nodesArray.length - 1].focus()
        }, 0)
      }
      if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
        nodesArray[0].focus()
        e.preventDefault()
      }
    }
  }
}
