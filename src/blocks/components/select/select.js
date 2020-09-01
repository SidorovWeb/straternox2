const select = () => {
  const selects = document.querySelectorAll('.custom-select')
  const options = document.querySelectorAll('.custom-select__option')

  selects.forEach((el) => {
    const currentSelect = el.querySelector('.selected')
    const currentTrigger = el.querySelector('.custom-select__trigger')
    createTriggerText(currentSelect, currentTrigger)
    createInputHidden(currentSelect, el)

    el.addEventListener('click', (e) => {
      e.preventDefault()

      el.classList.toggle('open')
    })
  })

  options.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()

      if (!el.classList.contains('selected')) {
        el.parentNode.querySelector('.selected').classList.remove('selected')
        el.classList.add('selected')
        el.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = el.textContent
        createInputHidden(el, el.closest('.custom-select'))
      }
    })
  })

  window.addEventListener('click', (e) => {
    for (const select of document.querySelectorAll('.custom-select')) {
      if (!select.contains(e.target)) {
        select.classList.remove('open')
      }
    }
  })
}

function createTriggerText(customSelectName, triggerName) {
  const span = document.createElement('span')
  span.textContent = customSelectName.textContent
  triggerName.prepend(span)
}

function createInputHidden(option, wrapper) {
  try {
    wrapper.querySelector('.input-hidden').remove()
  } catch (error) {console.log(error)}

  const input = document.createElement('input')
  input.setAttribute('type', 'hidden')
  input.setAttribute('name', option.dataset.value)
  input.setAttribute('value', option.dataset.value)
  input.classList.add('input-hidden')
  wrapper.append(input)
}

export default select
