const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector, clickCloseOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelectorAll(closeSelector),
      windows = document.querySelectorAll('[data-modal]'),
      forms = modal.querySelectorAll('form'),
      scroll = calc_scroll()
    // header = document.querySelectorAll('.header')

    trigger.forEach((i) => {
      i.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault()
        }
        windows.forEach((item) => {
          item.classList.remove('modal-open')
        })

        document.body.classList.add('modal-open')
        modal.classList.add('modal-open')

        if (get_scroll('Height')) {
          document.body.style.marginRight = `${scroll}px`
        }
        // Если header fixed
        // header.forEach((item) => {
        //   item.style.paddingRight = `${scroll}px`
        // })
      })
    })

    close.forEach((c) => {
      c.addEventListener('click', () => {
        windows.forEach((item) => {
          item.classList.remove('modal-open')
        })

        clearAttrs(modal)
      })
    })

    modal.addEventListener('click', (e) => {
      if (e.target == modal && clickCloseOverlay) {
        windows.forEach((item) => {
          item.classList.remove('modal-open')
        })

        clearAttrs(modal)
        // headerRemoveStyle(header)
      }
    })
    if (forms) {
      forms.forEach((f) => {
        f.addEventListener('submit', (e) => {
          e.preventDefault()
          modal.classList.remove('is-passed')
          modal.classList.remove('is-error')

          try {
            modal.classList.add('is-passed')

            setTimeout(() => {
              modal.classList.remove('is-passed')

              clearAttrs(modal)
              // headerRemoveStyle(header)

              f.reset()
            }, 2000)
          } catch (error) {
            modal.classList.add('is-error')

            setTimeout(() => {
              modal.classList.remove('is-error')

              clearAttrs(modal)
              // headerRemoveStyle(header)

              f.reset()
            }, 2000)
          }
        })
      })
    }
  }

  // Если header fixed
  // function headerRemoveStyle(el) {
  //   el.forEach((item) => {
  //     item.style.paddingRight = ''
  //   })
  // }

  function calc_scroll() {
    let div = document.createElement('div')
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.overflowY = 'scroll'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)

    let scrollWidth = div.offsetWidth - div.clientWidth // сама прокрутка
    div.remove()
    return scrollWidth
  }

  // Проверка на скролл
  function get_scroll(a) {
    var d = document,
      b = d.body,
      e = d.documentElement,
      c = 'client' + a
    a = 'scroll' + a
    return /CSS/.test(d.compatMode) ? e[c] < e[a] : b[c] < b[a]
  }

  function clearAttrs(modal) {
    modal.classList.remove('modal-open')
    document.body.classList.remove('modal-open')
    document.body.style.marginRight = ''
  }

  bindModal('.btn-popup', '.popup-wrapper', '.popup-wrapper .popup__close')
}

export default modals
