const submit = document.querySelector('#submitBtn');
const bandInput = document.querySelector('#bandName');
const album = document.querySelector('#album');
let bandName;
document.addEventListener('DOMContentLoaded', ev => {
    submit.addEventListener('click', ()=> {
        // window.location.href='https://www.metal-archives.com/';
        chrome.tabs.update({
            url: "https://www.metal-archives.com/"
        })
    })
   
    let structure={};
    document.querySelector('.inputs').addEventListener('change', function(e){
        if(e.target.matches('#bandName')){
            structure.category = 'band_name';
            structure.input = e.target.value;
        }
        if(e.target.matches('#album')){
            structure.category = 'album_title';
            structure.input = e.target.value;
        }
        console.log('sss ', structure)
        sessionStorage.setItem('ma-structure',JSON.stringify(structure));
      })
    })
