export default class Tabs {
  constructor(options) {
    if (typeof options.element === 'string') {
      this.el = document.querySelector(options.element)
    }
    if (typeof options.element === 'object') {
      this.el = options.element
    }

    this.setup()
  }

  setup() {
    this.tabs = this.el.querySelectorAll('[data-tab]')

    this.listeners()
  }

  listeners() {
    this.tabs.forEach((el) => {
      el.addEventListener('click', (event) => {
        this.show(event, el)
      })
    })
  }

  show(event, el) {
    event.preventDefault()

    if (!el.classList.contains('selected')) {
      const valueTab = el.dataset.tab
      const currentContent = el
        .closest('.tabs')
        .querySelector(`[data-tab-content=${valueTab}]`)

      this.el.querySelectorAll('.selected').forEach((s) => {
        s.classList.remove('selected')
      })

      el.classList.add('selected')
      currentContent.classList.add('selected')
    }
  }
}
