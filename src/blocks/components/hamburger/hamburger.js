import { closestItemByClass } from '../../../js/modules/utils';

function switcher (e) {
  if (closestItemByClass(e.target, 'hamburger')) {
    const hamburgers = document.querySelectorAll('.hamburger')
    hamburgers.forEach(el => {
      el.classList.contains('hamburger--open')
      ? el.classList.remove('hamburger--open')
      : el.classList.add('hamburger--open')
    })
  }
}

const hamburger = () => {
  document.addEventListener('click', switcher)
}

export default hamburger