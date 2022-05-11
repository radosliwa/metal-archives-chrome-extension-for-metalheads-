<template>
    <div id="ma-container" class="bg-black p-8 min-h-screen max-w-md text-center">
        <div class="icon-wrapper flex justify-between">
            <div class="pentagram">
                <img class="pentagram" src="./assets/images/pentagram.svg" alt="pentagram">
            </div>
            <div class="pentagram">
                <img class="pentagram" src="./assets/images/pentagram.svg" alt="pentagram">
            </div>
        </div>
        <form id="searchForm" action="" class="flex flex-col">
            <div class="inputs flex flex-col">
                <label for="bandName" class="text-white">BAND:</label>
                <input type="text" ref="inputBand" name="band" id="bandName" autofocus>
                <label for="album" class="text-white">ALBUM:</label>
                <input type="text" ref="inputAlbum" name="album" id="album">
            </div>
            <div role="button" id="submitBtn" class="text-white" ref="submitBtn" type="submit"
                @click.prevent="handleSubmit">FIND</div>
        </form>
        <div class="icon-wrapper flex space">
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
        const formData: IFormData = reactive({
            category: '',
            input: ''
        })
        const formReady = computed(() => formData.category.length > 0 || formData.input.length > 0);

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
            input = (e.target as HTMLInputElement)!.value;
        }

        function populateStorage(): void {
            if (formReady && chrome?.storage) {
                chrome.storage.sync.set({ 'ma-structure': JSON.stringify(formData) });
            }
        }

        function redirectToMA(): void {
            // if (chrome?.tabs) {
            //     chrome.tabs.update({
            //         url: import.meta.env.METAL_ARCHIVES, active: true
            //     })
            // }
            // manifest 3 update active tab

            if (chrome?.tabs) {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    // @ts-ignore
                    chrome.tabs.update(tabs[0].id, { url: import.meta.env.METAL_ARCHIVES });
                });
            }
        }
        function checkIfEnterPressedAndFormReady(): void {
            handleListener(document, 'keyup', (e: KeyboardEvent | Event) => {
                if ((e as KeyboardEvent).key === 'Enter' && Object.keys(formData).length) {
                    handleSubmit();
                }
            })
        }

        function handleSubmit(e: Event | null = null): void {
            if (e) {
                e.preventDefault();
            }
            if (formReady.value) {
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