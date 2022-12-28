<template>
  <div
    id="ma-container"
    class="p-8 text-center bg-black w-96"
  >
    <div class="flex justify-between icon-wrapper">
      <div class="pentagram">
        <Pentagram
          class="pentagram"
          alt="pentagram"
        />
      </div>
      <div class="pentagram">
        <Pentagram
          class="pentagram"
          alt="pentagram"
        />
      </div>
    </div>
    <form
      id="search-form"
      action=""
      class="flex flex-col py-4 text-xl"
    >
      <div class="flex flex-col inputs">
        <!-- dropdown start -->
        <div class="relative mb-8 text-white cursor-pointer">
          <div
            class="flex items-center justify-between px-2 border-2 categories__header"
            @click="toggleCategories"
          >
            <p class="py-2 text-white">
              {{ activeCategory.copy && !showCategories ? activeCategory.copy : "Choose category" }}
            </p>
            <Cross
              class="h-[30px] transition-all duration-200 transform rotate-180"
              :class="{ 'rotate-[360deg]': showCategories }"
            />
          </div>
          <ul
            v-if="showCategories"
            ref="options"
            class="absolute w-full bg-black"
          >
            <li
              class="py-2 border-x-2 hover:bg-zinc-600"
              @click="
                activeCategory.optionValue = OptionValue.BAND;
                activeCategory.copy = 'Band';
                showCategories = !showCategories;
              "
            >
              <p> Band </p>
            </li>
            <li
              class="py-2 border-2 hover:bg-zinc-600"
              @click="
                activeCategory.optionValue = OptionValue.ALBUM;
                activeCategory.copy = 'Album';
                showCategories = !showCategories;
              "
            >
              <p>Album</p>
            </li>
          </ul>
        </div>
        <!-- dropdown end -->

        <!-- INPUT STARTS -->
        <label
          :for="`${activeCategory.optionValue}-input`"
          class="absolute invisible text-white"
        >
          {{ activeCategory.copy.toUpperCase() }}
        </label>
        <input
          :id="`${activeCategory.optionValue}-input`"
          type="text"
          :name="`${activeCategory.optionValue}-input`"
          class="p-2 mb-4 placeholder:text-red-600"
          :placeholder="isInputError ? `Input required!` : ''"
          autofocus
          @input="handleInput($event, activeCategory.optionValue)"
        >
        <!-- INPUT ENDS -->
      </div>
      <div
        id="submitBtn"
        role="button"
        class="relative flex items-center justify-center text-white cursor-pointer"
        type="submit"
        @click="handleSubmit"
        @keyup.enter="handleSubmit"
        @mouseenter="findHovered = true"
        @mouseleave="findHovered = false"
      >
        <Sword
          class="bg-transparent max-w-20 rotate-[-47deg] max-h-[50px] absolute left-2 transition-all duration-200 ease-in"
          :class="[
            { 'transform translate-x-14': findHovered },
            { 'transform translate-x-20 duration-75': findSelected },
          ]"
        />
        FIND
        <Sword
          class="bg-transparent max-w-20 rotate-[132deg] max-h-[50px] absolute right-2 transition-all duration-200 ease-in"
          :class="[
            { 'transform -translate-x-14': findHovered },
            { 'transform -translate-x-20 duration-75': findSelected },
          ]"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Sword from '@/assets/images/sword.svg?component'
import Cross from '@/assets/images/cross.svg?component'
import Pentagram from '@/assets/images/pentagram.svg?component'
import { onClickOutside } from '@vueuse/core'

enum OptionValue {
  BAND = 'band_name',
  ALBUM = 'album_title',
}

type TCategory = `${OptionValue}` | '';

interface IFormData {
  category: TCategory;
  input: string;
}

interface IActiveCategory {
  optionValue: TCategory;
  copy: 'Band' | 'Album' | '';
}

const options = ref(null)

const activeCategory = ref<IActiveCategory>({
  optionValue: '',
  copy: '',
})

const showCategories = ref(false)
const findSelected = ref(false)
const isInputError = ref(false)
const findHovered = ref(false)
const formData = ref<IFormData>({
  category: activeCategory.value.optionValue,
  input: '',
})

onClickOutside(options, () => (showCategories.value = false))

const toggleCategories = () => {
  showCategories.value = !showCategories.value
}

const handleInput = (e: Event, category: TCategory) => {
  const input = (e.target as HTMLInputElement).value
  formData.value.category = category
  formData.value.input = input
}

const formReady = computed(() => formData.value.category.length && formData.value.input.length)

const populateStorage = (): void => {
  if (formReady.value && chrome?.storage) {
    chrome.storage.sync.set({ 'ma-structure': JSON.stringify(formData.value) }, () => {
      console.log('stored')
    })
  }
}

const redirectToMA = (): void => {
  if (chrome?.tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // @ts-ignore
      chrome.tabs.update(tabs[0].id, { url: 'https://www.metal-archives.com/' })
    })
  }
}

const handleSubmit = () => {
  findHovered.value = false
  if (formReady.value) {
    isInputError.value = false
    findSelected.value = true
    populateStorage()
    redirectToMA()
    return
  }
  isInputError.value = true
}
</script>

<style lang="scss">
* {
  font-family: "Oswald", sans-serif;
  box-sizing: border-box;
}
</style>
