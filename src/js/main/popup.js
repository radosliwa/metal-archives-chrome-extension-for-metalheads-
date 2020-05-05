const submit = document.querySelector('#submitBtn');
const bandInput = document.querySelector('#bandName');
const album = document.querySelector('#album');
let bandName;
let structure={};
document.addEventListener('DOMContentLoaded', ev => {
    document.querySelector('.inputs').addEventListener('change', function (e) {
        if (e.target.matches('#bandName')) {
            structure.category = 'band_name';
            structure.input = e.target.value;
        }
        if (e.target.matches('#album')) {
            structure.category = 'album_title';
            structure.input = e.target.value;
        }
    })
    function popup() {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            console.log('tabs ',tabs )
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
       });
    }
    
    submit.addEventListener('click', () => {
        if (Object.keys(structure).length !== 0) {
            chrome.storage.sync.set({'ma-structure': JSON.stringify(structure)}, function() {
                console.log('Value is set to ' + JSON.stringify(structure));
              });
            chrome.tabs.update({
                url: "https://www.metal-archives.com/", active:true
            })
            popup();
            
        }
    })
})
