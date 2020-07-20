const hamburger = () => {
  const hamburger = document.querySelector('.hamburger')
  const nav = document.querySelector('.nav')

  hamburger.addEventListener('click', function (e) {
    e.preventDefault()
    this.classList.remove('hide')

    this.classList.toggle('hamburger--open')
    document.body.classList.toggle('menu-open')
    nav.classList.toggle('menu-open')
  })

  nav.addEventListener('click', function (e) {
    if (e.target == nav) {
      closeMobileMenu(this, hamburger)
      this.classList.add('hide')
    }
  })

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
      closeMobileMenu(nav, hamburger)
    }
  })
}

function closeMobileMenu(nav, hamburger) {
  hamburger.classList.remove('hamburger--open')
  document.body.classList.remove('menu-open')
  nav.classList.remove('menu-open')
}

export default hamburger
