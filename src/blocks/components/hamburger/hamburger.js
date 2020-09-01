const hamburger = () => {
  const hamburger = document.querySelector('.hamburger')
  const nav = document.querySelector('.nav')
  const overlay = document.querySelector('.overlay')

  hamburger.addEventListener('click', function (e) {
    e.preventDefault()
    this.classList.remove('hide')

    if (!nav.classList.contains('menu-open')) {
      document.body.classList.add('menu-open')
      this.classList.add('hamburger--open')
      overlay.classList.add('open')
      nav.classList.add('menu-open')
    } else {
      nav.classList.add('hide')

      setTimeout(() => {
        closeMobileMenu(nav, this, overlay)
      }, 200);
    }
  })

  nav.addEventListener('click', function (e) {
    if (e.target == nav) {
       this.classList.add('hide')

      setTimeout(() => {
        closeMobileMenu(this, hamburger, overlay)
      }, 200);
    }
  })

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
      closeMobileMenu(nav, hamburger, overlay)
    }
  })
}

function closeMobileMenu(nav, hamburger,overlay) {
  nav.classList.remove('menu-open', 'hide')
  hamburger.classList.remove('hamburger--open')
  overlay.classList.remove('open')
  document.body.classList.remove('menu-open')
}

export default hamburger
