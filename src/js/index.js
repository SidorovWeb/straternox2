import './import/polyfill'
import './import/svg4everybody'
import './import/lazyLoad'
import './import/objectFitImages'
import './import/dragstart'
import 'focus-visible'
import viewportOnMobile from './modules/viewportOnMobile'
import switcherThemes from './modules/switcherThemes'
import Modal from '../blocks/components/modal/modal'
import Select from '../blocks/components/select/select'
import Tabs from '../blocks/components/tabs/tabs'
import Accordion from '../blocks/components/accordion/accordion'
import swiperSlider from '../blocks/components/slider/slider'
import hamburger from '../blocks/components/hamburger/hamburger'
import Menu from '../blocks/components/menu/menu';
import Form from '../blocks/components/form/form';
import imask from './modules/imask';
// import smoothScroll from './modules/scroll-anchors'




window.addEventListener('DOMContentLoaded', () => {
  switcherThemes()

  viewportOnMobile()

  new Modal({
    trigger: '.modal__trigger',
    modal: '.modal',
    close: '.modal__close'
  })


  new Tabs({
    element: '.tabs' // element == 'string'|| selector
  })

  new Select({
    element: '.select', // element == 'string'|| selector
    placeholder: '.selected',
    hiddenInput: true
  })

  new Accordion({
    element: '.accordion'
  })

  swiperSlider()

  hamburger()

  new Menu({
    elementHamburger: '.hamburger',
    nav: '.nav'
  })

  const forms = document.querySelectorAll('form')
  forms.forEach(form => {
    new Form({
      form: form,
      errorClass: 'required',
      validClass: 'success',
      isValidClass: false,
      settings: {
        text: {
          required: 'Это поле обязательно'
        },
        email: {
          required: 'Это поле обязательно',
          error: 'Адрес электронной почты должен быть в формате name@domain.com'
        },
        phone: {
          required: 'Это поле обязательно',
          error: 'Введите полный номер'
        },
        checkbox: {
          required: 'Это поле обязательно'
        }
      },
      submitHandler:(form, event) => {
        sendData(form, event)
      }
    })
  })

  function sendData(form, event) {
    const xhr = new XMLHttpRequest()
    const fd = new FormData(form)
    xhr.addEventListener( "load", function() {
      callModalWindow('.modal-success', event)
    })
    xhr.addEventListener( "error", function() {
      callModalWindow('.modal-error', event)
    })
    xhr.open( "POST", "mail/mail.php" )
    xhr.send( fd )
    form.reset()
  }

  function callModalWindow(modalName, event) {
    if ( document.querySelector('.modal-open')) {
      document.querySelector('.modal-open').classList.add('modal-close')
    }

    const modal = new Modal({
      modal: modalName,
      close: '.modal__close',
    })
    modal.open()
    setTimeout(() => {
      modal.close()
      setTimeout(() => {
        event.submitter.focus()
      }, 0)
    }, 2500)
  }

  imask()
})