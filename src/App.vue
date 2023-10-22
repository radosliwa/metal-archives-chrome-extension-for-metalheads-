<template>
  <div
    id="ma-container"
    class="p-8 text-center bg-black w-96 rounded-xl"
  >
    <div class="flex justify-between icon-wrapper">
      <div class="pentagram">
        <Pentagram
          class="scale-150"
          alt="pentagram"
        />
      </div>
      <div class="pentagram">
        <Pentagram
          class="scale-150"
          alt="pentagram"
        />
      </div>
    </div>
    <CategoryForm
      @redirect-to-ma="redirectToMA"
    />
  </div>
</template>

<script setup lang="ts">
import CategoryForm from '@/components/CategoryForm.vue'
import Pentagram from '@/assets/images/pentagram.svg?component'

const redirectToMA = (): void => {
  if (chrome?.tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // @ts-ignore
      chrome.tabs.update(tabs[0].id, { url: 'https://www.metal-archives.com/' })
    })
  }
}

</script>

<style lang="scss">
* {
  font-family: "Oswald", sans-serif;
  box-sizing: border-box;
}
</style>
