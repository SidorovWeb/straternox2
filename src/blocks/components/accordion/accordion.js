export default class Accordion {
  constructor(options) {
    if (typeof options.element === 'string') {
      this.el = document.querySelector(options.element)
    }
    if (typeof options.element === 'object') {
      this.el = options.element
    }

    try {
      this.setup()
    } catch (error) {
      return
    }
  }

  setup(){
    this.isAnimating = false
    this.title = this.el.querySelectorAll('.accordion__title')

    this.el.querySelectorAll('.open').forEach(el => {
      el.nextElementSibling.style.height = 'auto'
      el.nextElementSibling.style.height = `${el.nextElementSibling.scrollHeight}px`
    })

    this.listeners()
  }

  listeners() {
    this.title.forEach(el => {
      el.addEventListener('click', (event) => {

        if (this.isAnimating) return

        event.preventDefault()

        if (el.classList.contains('open')) {
          this.close(el)
        } else {
          this.open(el)
        }

      })
    })
  }

  open(element) {
    this.isAnimating = true
    let el = element.nextElementSibling

    el.style.height = `${el.scrollHeight}px`
      element.classList.add('open')
      el.classList.remove('is-collapsed')
      this.isAnimating = false
  }

  close(element) {
    this.isAnimating = true
    let el = element.nextElementSibling

    el.style.height = `${el.scrollHeight}px`
      el.classList.add('is-collapsed')
      el.style.height = ''
      element.classList.remove('open')
      this.isAnimating = false
  }
}