import Swiper, { Navigation, Lazy } from 'swiper'

Swiper.use([Navigation, Lazy])
// init Swiper:
const swiperSlider = () => {
  new Swiper('.swiper-container', {
    loop: true,
    // lazy: {
    //   loadPrevNext: false,
    //   loadOnTransitionStart: true,
    // },
    preloadImages: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      clickable: true,
    },
  })
}

export default swiperSlider
