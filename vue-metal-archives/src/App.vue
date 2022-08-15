<template>
  <div
    id="ma-container"
    class="max-w-md min-h-screen p-8 text-center bg-black"
  >
    <div class="flex justify-between icon-wrapper">
      <div class="pentagram">
        <img
          class="pentagram"
          src="./assets/images/pentagram.svg"
          alt="pentagram"
        >
      </div>
      <div class="pentagram">
        <img
          class="pentagram"
          src="./assets/images/pentagram.svg"
          alt="pentagram"
        >
      </div>
    </div>
    <form
      id="search-form"
      action=""
      class="flex flex-col py-4 text-xl"
    >
      <div class="flex flex-col inputs">
        <!-- dropdown start -->
        <div class="relative mb-8 text-white cursor-pointer ">
          <div
            class="flex items-center justify-between px-2 border-2 categories__header"
            @click="toggleCategories"
          >
            <p class="py-2 text-white">
              {{ activeCategory && !showCategories ? activeCategory : 'Choose category' }}
            </p>
            <Cross
              class="h-[30px] transition-all duration-200 transform rotate-180"
              :class="{'rotate-[360deg]': showCategories}"
            />
          </div>
          <ul
            v-if="showCategories"
            class="absolute w-full bg-black"
          >
            <li
              class="py-2 border-x-2 hover:bg-zinc-600"
              @click="activeCategory = Category.ARTIST; showCategories = !showCategories"
            >
              <p> {{ Category.ARTIST.toUpperCase() }} </p>
            </li>
            <li
              class="py-2 border-2 hover:bg-zinc-600"
              @click="activeCategory = Category.ALBUM; showCategories = !showCategories"
            >
              <p> {{ Category.ALBUM.toUpperCase() }} </p>
            </li>
          </ul>
        </div>
        <!-- dropdown end -->

        <!-- INPUT STARTS -->
        <label
          :for="`${activeCategory}-input`"
          class="absolute invisible text-white"
        >
          {{ activeCategory.toUpperCase() }}
        </label>
        <input
          :id="`${activeCategory}-input`"
          type="text"
          :name="`${activeCategory}-input`"
          class="p-2 mb-4 placeholder:text-red-600"
          :placeholder="isInputError ? `Input required!` : ''"
          autofocus
          @input="handleInput($event, activeCategory)"
        >
        <!-- INPUT ENDS -->
      </div>
      <div
        id="submitBtn"
        role="button"
        class="relative flex items-center justify-center text-white cursor-pointer"
        type="submit"
        @click="handleSubmit"
        @mouseenter="findHovered = true;"
        @mouseleave="findHovered = false"
      >
        <Sword
          class="bg-transparent max-w-20 rotate-[-47deg] max-h-[50px] absolute left-2 transition-all duration-200 ease-in"
          :class="[{'transform translate-x-14': findHovered}, 
                   {'transform translate-x-24 duration-75': findSelected}]"
        />
        FIND
        <Sword 
          class="bg-transparent max-w-20 rotate-[132deg] max-h-[50px] absolute right-2 transition-all duration-200 ease-in"
          :class="[{'transform -translate-x-14': findHovered}, 
                   {'transform -translate-x-24 duration-75': findSelected}]"
        /> 
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
} from 'vue'
import Sword from './assets/images/sword.svg'
import Cross from './assets/images/cross.svg'

enum Category {
  ARTIST = 'Artist',
  ALBUM = 'Album',
}

type TCategory = `${Category}` | ''

interface IFormData {
  category: TCategory;
  input: string;
}

const activeCategory = ref<TCategory>('')
const showCategories = ref(false)
const findSelected = ref(false)
const isInputError = ref(false)
const findHovered = ref(false)
const formData = ref<IFormData>({
  category: '',
  input: '',
})

const toggleCategories = () => {
  showCategories.value = !showCategories.value
}

const handleInput = (e: Event, category: TCategory) => {
  const input =(e.target as HTMLInputElement).value
  formData.value.category = category
  formData.value.input = input
  console.log('formData', formData.value) 
  
  // if (e.key === 'Enter') {
  //   handleSubmit()
  // }

  // input value
  
}
const formReady = computed<boolean>(
  () => formData.value.category.length > 0 || formData.value.input.length > 0
)

function populateStorage(): void {
  if (formReady.value && chrome?.storage) {
    chrome.storage.sync.set({ 'ma-structure': JSON.stringify(formData.value) }, () => {
      console.log('stored')
    })
  }
}

async function redirectToMA(): Promise<void> {
  if (chrome?.tabs) {
    await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // @ts-ignore
      chrome.tabs.update(tabs[0].id, { url: 'https://www.metal-archives.com/' })
    })
  }
}

function handleSubmit(): void {
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
    font-family: 'Oswald', sans-serif;
    box-sizing: border-box;
}
</style>
