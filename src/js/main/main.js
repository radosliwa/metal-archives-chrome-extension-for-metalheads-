
   const searchQueryBox = document.querySelector('#searchQueryBox');
   
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "start" ) {
            start();
        }
    }
    );
    
    function start(){
        alert("started");
    }
    chrome.storage.sync.get(['ma-structure'], function(res){
        console.log( res['ma-structure'])
        let response = JSON.parse(res['ma-structure']);
        searchQueryBox.value = response.input;
    });
