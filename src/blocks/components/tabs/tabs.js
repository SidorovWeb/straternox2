const tabs = () => {
  const tabs = document.querySelectorAll('.tabs__tab')

  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault()

      const value = tab.dataset.tab

      if (!tab.classList.contains('selected')) {
        const currentTab = tab.closest('.tabs').querySelector(`[data-tab=${value}]`)
        const currentContent = tab.closest('.tabs').querySelector(`[data-tab-content=${value}]`)

        const selectedItems = currentTab.closest('.tabs').querySelectorAll('.selected')
        selectedItems.forEach((item) => {
          item.classList.remove('selected')
        })

        currentTab.classList.add('selected')
        currentContent.classList.add('selected')
      }
    })
  })
}

export default tabs
