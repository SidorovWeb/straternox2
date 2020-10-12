import IMask from 'imask';

const imask = () => {
  const elements = document.querySelectorAll('.imask')
  const maskOptions = {
    mask: '+{7}{  }(000){  }000{-}00{-}00',
  }

  for (let i = 0; i < elements.length; i++) {
    IMask(elements[i], maskOptions)
  }
}

export default imask
