const submit = document.querySelector('#submitBtn');
const band = document.querySelector('#bandName');
const album = document.querySelector('#album');
document.addEventListener('DOMContentLoaded', ev => {
    submit.addEventListener('click', ()=> {
        // window.location.href='https://www.metal-archives.com/';
        chrome.tabs.update({
            url: "https://www.metal-archives.com/"
        })
    })
    fill();
    
})
function fill(){
}
        chrome.runtime.onMessage.addListener(
            // fill
            );