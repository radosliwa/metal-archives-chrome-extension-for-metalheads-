<template>
    <div id="ma-container">
        <div class="icon-wrapper">
            <div class="pentagram">
                <img class="pentagram" src="./assets/images/pentagram.svg" alt="pentagram">
            </div>
            <div class="pentagram">
                <img class="pentagram" src="./assets/images/pentagram.svg" alt="pentagram">
            </div>
        </div>
        <form id="searchForm" action="">
            <div class="inputs">
                <label for="bandName">BAND:</label>
                <input type="text" ref="inputBand" name="band" id="bandName" autofocus>
                <label for="album">ALBUM:</label>
                <input type="text" ref="inputAlbum" name="album" id="album">
            </div>
            <button id="submitBtn" ref="submitBtn" type="submit" @click.prevent="handleSubmit">FIND</button>
        </form>
        <div class="icon-wrapper">
            <div class="pentagram">
                <img class="pentagram" src="./assets/images/pentagram.svg" alt="">
            </div>
            <div class="pentagram">
                <img class="pentagram" src="./assets/images/pentagram.svg" alt="">
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref, onUnmounted } from 'vue'

interface IFormData {
    category: string;
    input: string;
}

export default defineComponent({
    setup() {
        const submitBtn = ref<HTMLButtonElement | null>(null);
        const inputBand = ref<HTMLInputElement | null>(null);
        const inputAlbum = ref<HTMLInputElement | null>(null);
        const inputs: Ref<HTMLInputElement | null>[] = [inputBand, inputAlbum];
        const enterPressedAndFormReady = ref(false);
        const formData: IFormData = reactive({
            category: '',
            input: ''
        })

        function handleListener(elem: any, event: string, callback: (e: Event | KeyboardEvent) => void, action: 'add' | 'remove' = 'add') {
            if (action === 'add') {
                elem.addEventListener(event, (e: Event) => {
                    callback(e);
                });
            } else {
                elem.removeEventListener(event, (e: Event) => {
                    callback(e);
                });
            }
        }

        function collectDataOnInput(): void {
            inputs.forEach(elem => {
                const input = elem.value as HTMLInputElement;
                handleListener(input, 'input', (e: Event) => {
                    getDataFromInputs(formData, e);
                });
            });
        }

        function getDataFromInputs(formData: IFormData, e: Event): void {
            let { category, input } = formData;
            if (e.target === inputBand.value) {
                category = 'band_name';
            }
            if (e.target === inputAlbum.value) {
                category = 'album_title';
            }
            input = e.target!.value;
        }

        function populateStorage(): void {
            if (Object.keys(formData).length && chrome?.storage) {
                chrome.storage.sync.set({ 'ma-structure': JSON.stringify(formData) });
            }
        }

        function redirectToMA(): void {
            if (chrome?.tabs) {
                chrome.tabs.update({
                    url: import.meta.env.METAL_ARCHIVES, active: true
                })
            }
        }

        function checkIfEnterPressedAndFormReady(): void {
            handleListener(document, 'keyup', (e: KeyboardEvent | Event) => {
                if ((e as KeyboardEvent).key === 'Enter' && Object.keys(formData).length) {
                    enterPressedAndFormReady.value = true
                }
            })
        }

        function handleSubmit(e: Event): void {
            e.preventDefault();
            if (enterPressedAndFormReady.value) {
                populateStorage();
                redirectToMA();
            }
        }

        //     submit.addEventListener('click', () => {
        //         this.submitAndRedirect()
        //     })
        // submitAndRedirect() {
        //     this.populateStorage(this.structure);
        //     this.redirectToMA();
        //     window.close();
        // }

        onMounted(() => {
            collectDataOnInput()
            checkIfEnterPressedAndFormReady()
        })

        onUnmounted(() => {
            inputs.forEach(elem => {
                const input = elem.value as HTMLInputElement;
                handleListener(input, 'input', (e: Event) => {
                    getDataFromInputs(formData, e);
                }, 'remove');
            });
        })

        return {
            submitBtn,
            inputBand,
            inputAlbum,
            handleSubmit
        }
    }
})
</script>

<style lang="scss">
</style>