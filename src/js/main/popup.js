
document.addEventListener('DOMContentLoaded', ev => {
    const submit = document.querySelector('#submitBtn');
    const inputs = document.querySelector('.inputs');
    const bandInput = inputs.querySelector('#bandName');
    const albumInput = inputs.querySelector('#album');
    
    const maHandler = {
        structure: {
            category: '',
            input: ''
        },
        init() {
            this.collectData();
            this.bindEvents();
        },
        collectData() {
            inputs.addEventListener('input', (e) => {
                if (e.target === bandInput) {
                    this.structure.category = 'band_name';
                }
                if (e.target === albumInput) {
                    this.structure.category = 'album_title';
                }
                this.structure.input = e.target.value;
            })
        },
        bindEvents() {
            this.collectData()
            // populate storage and redirect-------------------------
            document.addEventListener('keypress', (e) => {
                const code = e.key.toLowerCase()
                if (code === 'enter' && Object.keys(this.structure).length) {
                    this.submitAndRedirect()
                }
            })
            submit.addEventListener('click', () => {
                this.submitAndRedirect()
            })
        },
        populateStorage(obj) {
            if (Object.keys(obj).length && chrome?.storage) {
                chrome.storage.sync.set({ 'ma-structure': JSON.stringify(obj) }, null);
            }
        },
        redirectToMA() {
            if (chrome?.tabs) {
                chrome.tabs.update({
                    url: "https://www.metal-archives.com/", active: true
                })
            }
        },
        submitAndRedirect() {
            this.populateStorage(this.structure);
            this.redirectToMA();
            window.close();
        }
    }
    maHandler.init();
})


