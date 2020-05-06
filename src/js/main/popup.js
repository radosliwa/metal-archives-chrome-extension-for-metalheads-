const submit = document.querySelector('#submitBtn');
const bandInput = document.querySelector('#bandName');
const album = document.querySelector('#album');

document.addEventListener('DOMContentLoaded', ev => {
    // collecting data-------------------------
    let structure = collectData();
    /*---------------------------------------*/

    // populate storage and redirect-------------------------
    document.addEventListener('keypress', (e) => {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13 && Object.keys(structure).length !== 0) {
            populateStorage(structure);
            redirectToMA();
            window.close();
        }
    })
    submit.addEventListener('click', () => {
        populateStorage(structure);
        redirectToMA();
        window.close();
    })
    /*---------------------------------------*/
})

function collectData(){
    let obj = {}
    document.querySelector('.inputs').addEventListener('input', (e) => {
        if (e.target.matches('#bandName')) {
            obj.category = 'band_name';
            obj.input = e.target.value;
        }
        if (e.target.matches('#album')) {
            obj.category = 'album_title';
            obj.input = e.target.value;
        }
    })
    return obj;
}
function populateStorage(obj) {
    if (Object.keys(obj).length !== 0) {
        chrome.storage.sync.set({ 'ma-structure': JSON.stringify(obj) }, null);
    }
}
function redirectToMA() {
    chrome.tabs.update({
        url: "https://www.metal-archives.com/", active: true
    })
}