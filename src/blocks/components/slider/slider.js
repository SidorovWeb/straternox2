import Swiper, { Navigation } from 'swiper'

Swiper.use([Navigation])
// init Swiper:
const swiperSlider = () => {
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      clickable: true,
    },
  })
}

export default swiperSlider
