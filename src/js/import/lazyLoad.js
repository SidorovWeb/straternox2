import LazyLoad from 'vanilla-lazyload'

const canUseWebP = function() {
  const elem = document.createElement('canvas')

  // eslint-disable-next-line no-extra-boolean-cast
  if (!!(elem.getContext && elem.getContext('2d'))) {
      // was able or not to get WebP representation
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
  }

  // very old browser like IE 8, canvas not supported
  return false
}

const isWebpSupported = canUseWebP()

if (isWebpSupported === false) {
  let lazyItems = document.querySelectorAll('[data-bg-replace-webp]')

  lazyItems.forEach(el => {
    const dataSrcReplaceWebp = el.getAttribute('data-bg-replace-webp')

    if (dataSrcReplaceWebp !== null) {
      el.setAttribute('data-bg', dataSrcReplaceWebp)
    }
  })
}

// Удаляем lazy в контейнере swiper-container и добавляем swiper-lazy
const callback_loaded = (el) => {
  if (el.dataset.sliderClass) {
    const parent = el.closest('.swiper-container')
    const children = parent.querySelectorAll('.lazy')

    children.forEach((child) => {
      child.classList.remove('lazy')
      child.classList.add('swiper-lazy')
    })
  }
}

new LazyLoad({
  threshold: 0,
  elements_selector: '.lazy',
  callback_loaded
})