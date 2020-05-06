
   const searchForm = document.querySelector('#search_form');
   const searchQueryBox = document.querySelector('#searchQueryBox');
   const select = document.querySelector('#search_form select');
    chrome.storage.sync.get(['ma-structure'], function(res){
        console.log(res['ma-structure'])
        let response = JSON.parse(res['ma-structure']);
        select.value = response.category;
        searchQueryBox.value = response.input;
        setTimeout(()=>{
            searchForm.submit();
          },500)
    });
