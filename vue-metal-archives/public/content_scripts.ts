

chrome.storage.sync.get(['ma-structure'], async (res: { [x: string]: string; }) => {
  console.log('RESPONSE1', res)
  const response = await JSON.parse(res['ma-structure'])
  const searchForm: HTMLFormElement | null = document.querySelector('#search_form')
  const searchQueryBox: HTMLInputElement | null = document.querySelector('#searchQueryBox')
  const select: HTMLSelectElement | null = document.querySelector('#search_form select')
  console.log('RESPONSE2', response)
  select!.value = response?.category || ''
  searchQueryBox!.value = response?.input || ''
  setTimeout(() => {
    searchForm!.submit()
  }, 1500)
})