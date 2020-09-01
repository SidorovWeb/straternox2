import LazyLoad from 'vanilla-lazyload'

// Удаляем lazy в контейнере swiper-container и добавляем swiper-lazy
const callback_loaded = (element) => {
  if (element.dataset.sliderClass) {
    const parent = element.closest('.swiper-container')
    const children = parent.querySelectorAll('.lazy')

    children.forEach((child) => {
      child.classList.remove('lazy')
      child.classList.add('swiper-lazy')
    })
  }
}

const myLazyLoad = new LazyLoad({
  threshold: 0,
  elements_selector: '.lazy',
  class_applied: 'lazy-applied',
  class_loading: 'lazy-loading',
  class_loaded: 'lazy-loaded',
  class_error: 'lazy-error',
  callback_loaded: callback_loaded,
})
