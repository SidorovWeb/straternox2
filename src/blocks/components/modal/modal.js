const modal = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelectorAll(closeSelector),
      windows = document.querySelectorAll('[data-modal]'),
      overlay = document.querySelector('.overlay'),
      forms = modal.querySelectorAll('form'),
      scroll = calc_scroll(),
      modalSuccess = document.querySelector('[data-modal-success]'),
      modalError = document.querySelector('[data-modal-error]'),
      windowClosingTime = 200
    // header = document.querySelectorAll('.header')

    trigger.forEach((t) => {
      t.addEventListener('click', (e) => {

        if (e.target) {
          e.preventDefault()
        }

        windows.forEach((item) => {
          item.classList.remove('modal-open','modal-close')
          overlay.classList.remove('open')
        })

        document.body.classList.add('modal-open')
        modal.classList.add('modal-open')
        overlay.classList.add('open')

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
        modal.classList.add('modal-close')

        setTimeout(() => {
          overlay.classList.remove('open')
          modal.classList.remove('modal-close','modal-open')
          bodyClear()

          if (forms) {
            clearForm(forms)
          }
        }, windowClosingTime);
      })
    })

    modal.addEventListener('click', (e) => {
      if (e.target == modal) {
        modal.classList.add('modal-close')

        setTimeout(() => {
          overlay.classList.remove('open')
          modal.classList.remove('modal-close','modal-open')
          bodyClear()

          if (forms) {
            clearForm(forms)
          }
        }, windowClosingTime);
        // headerRemoveStyle(header)
      }
    })
    if (forms) {
      forms.forEach((f) => {
        f.addEventListener('submit', (e) => {
          e.preventDefault()
        modal.classList.add('modal-close')

        setTimeout(() => {
          modal.classList.remove('modal-open')
          try {
            windowInfo(f,modalSuccess, modal,overlay,windowClosingTime)
          } catch (error) {
            windowInfo(f,modalError, modal,overlay,windowClosingTime)
          }
        }, 200);
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

  function windowInfo(form,windowName, modal,overlay,time) {
    windowName.classList.add('modal-open','is-success')

    setTimeout(() => {
      modal.classList.remove('is-passed')
      windowName.classList.add('modal-close')

      setTimeout(() => {
        windowName.classList.remove('modal-open','is-success','modal-close')
        modal.classList.remove('modal-close')
        overlay.classList.remove('open')
        document.body.classList.remove('modal-open')
        document.body.style.marginRight = ''
        form.reset()
      }, time);
      // headerRemoveStyle(header)
    }, 2000)
  }

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

  function bodyClear() {

    document.body.classList.remove('modal-open')
    document.body.style.marginRight = ''
  }

  function clearForm(forms) {
      forms.forEach((f) => {
        f.reset()
      })
  }

  bindModal('.btn-modal', '.modal-wrapper', '.modal-wrapper .modal__close')
}

export default modal
