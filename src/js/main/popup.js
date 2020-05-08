
document.addEventListener('DOMContentLoaded', ev => {
    const submit = document.querySelector('#submitBtn');
    const bandInput = document.querySelector('#bandName');
    const album = document.querySelector('#album');

    const maHandler = {
        structure: '',
        init() {
            // collecting data-------------------------
            this.structure = this.collectData();
            /*---------------------------------------*/
            this.bindEvents();
        },
        collectData() {
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
        },
        bindEvents() {
            // populate storage and redirect-------------------------
            document.addEventListener('keypress', (e) => {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code == 13 && Object.keys(this.structure).length !== 0) {
                    this.populateStorage(this.structure);
                    this.redirectToMA();
                    window.close();
                }
            })
            submit.addEventListener('click', () => {
                this.populateStorage(structure);
                this.redirectToMA();
                window.close();
            })
        },
        populateStorage(obj) {
            if (Object.keys(obj).length !== 0) {
                chrome.storage.sync.set({ 'ma-structure': JSON.stringify(obj) }, null);
            }
        },
        redirectToMA() {
            chrome.tabs.update({
                url: "https://www.metal-archives.com/", active: true
            })
        }
    }
    maHandler.init();

})


