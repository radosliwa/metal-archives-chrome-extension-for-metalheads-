<template>
    <div id="ma-container" class="max-w-md min-h-screen p-8 text-center bg-black">
        <div class="flex justify-between icon-wrapper">
            <div class="pentagram">
                <img class="pentagram" src="./assets/images/pentagram.svg" alt="pentagram">
            </div>
            <div class="pentagram">
                <img class="pentagram" src="./assets/images/pentagram.svg" alt="pentagram">
            </div>
        </div>
        <form id="searchForm" action="" class="flex flex-col">
            <div class="flex flex-col inputs">
                <label for="bandName" class="text-white">BAND:</label>
                <input type="text" ref="inputBand" name="band" id="bandName" autofocus>
                <label for="album" class="text-white">ALBUM:</label>
                <input type="text" ref="inputAlbum" name="album" id="album">
            </div>
            <div role="button" id="submitBtn" class="text-white" ref="submitBtn" type="submit"
                @click.prevent="handleSubmit">FIND</div>
        </form>
        <div class="flex icon-wrapper space">
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
import { defineComponent, onMounted, reactive, Ref, ref, onUnmounted, computed } from 'vue'

interface IFormData {
    category: string;
    input: string;
}

export default defineComponent({
    setup() {
        const submitBtn = ref<HTMLDivElement | null>(null);
        const inputBand = ref<HTMLInputElement | null>(null);
        const inputAlbum = ref<HTMLInputElement | null>(null);
        const inputs: Ref<HTMLInputElement | null>[] = [inputBand, inputAlbum];
        const formData = ref<IFormData>({
            category: '',
            input: ''
        })
        const formReady = computed(() => formData.value.category.length > 0 || formData.value.input.length > 0);

        function handleListener(elem: any, event: string, callback: (e: Event | KeyboardEvent) => void, action: 'add' | 'remove' = 'add') {
            if (action === 'add') {
                elem.addEventListener(event, (e: Event) => {
                    callback(e);
                });
                return
            }
                elem.removeEventListener(event, (e: Event) => {
                    callback(e);
                });
        }

        function collectDataOnInput(): void {
            inputs.forEach(elem => {
                const input = elem.value as HTMLInputElement;
                handleListener(input, 'input', (e: Event) => {
                    getDataFromInputs(formData.value, e);
                });
            });
        }

        function getDataFromInputs(data: IFormData, e: Event): void {
            if (e.target === inputBand.value) {
                formData.value.category = 'band_name';
            }
            if (e.target === inputAlbum.value) {
                formData.value.category = 'album_title';
            }
            formData.value.input = (e.target as HTMLInputElement)!.value;
            console.log('FORM DATA', formData.value);
            
        }

        function populateStorage(): void {
            if (formReady && chrome?.storage) {
                chrome.storage.sync.set({ 'ma-structure': JSON.stringify(formData.value) }, () => {
                    console.log('stored');
                });
            }
        }

        async function redirectToMA(): Promise<Promise<void>> {
            if (chrome?.tabs) {
                await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    // @ts-ignore
                    chrome.tabs.update(tabs[0].id, { url: 'https://www.metal-archives.com/' });
                });
            }
        }
        function checkIfEnterPressedAndFormReady(): void {
            handleListener(document, 'keyup', (e: KeyboardEvent | Event) => {
                if ((e as KeyboardEvent).key === 'Enter' && Object.keys(formData.value).length) {
                    handleSubmit();
                }
            })
        }

        function handleSubmit() {
            if (formReady.value) {
                console.log('formReady.value', formReady.value);
                populateStorage();
                redirectToMA();
            }
                
        }

        onMounted(() => {
            collectDataOnInput()
            checkIfEnterPressedAndFormReady()
        })

        onUnmounted(() => {
            inputs.forEach(elem => {
                const input = elem.value as HTMLInputElement;
                handleListener(input, 'input', (e: Event) => {
                    getDataFromInputs(formData.value, e);
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