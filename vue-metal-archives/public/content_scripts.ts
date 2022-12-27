

chrome.storage.sync.get(['ma-structure'], async (res: { [x: string]: string; }) => {
  const response = await JSON.parse(res['ma-structure'])
  const searchFormBtn: HTMLFormElement | null = document.querySelector('#search_form button[type="submit"]')
  const searchQueryBox: HTMLInputElement | null = document.querySelector('#searchQueryBox')
  const select: HTMLSelectElement | null = document.querySelector('#search_form select')
  select!.value = response?.category || ''
  searchQueryBox!.value = response?.input || ''
  
  setTimeout(() => {
    searchFormBtn!.click()
  }, 1500)
})