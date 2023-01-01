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
            @click="toggleCategoriesVisibility"
          >
            <p class="py-3 text-white">
              {{ categoryName && !showCategories ? categoryName : "Choose category" }}
            </p>
            <Cross
              class="h-[30px] transition-all duration-200 transform rotate-180"
              :class="{ 'rotate-[360deg]': showCategories }"
            />
          </div>
          <ul
            v-show="showCategories"
            ref="options"
            class="absolute z-10 w-full bg-black"
          >
            <li
              class="py-3 border-x-2 hover:bg-zinc-600"
              @click="handleCategoryChange({ option: OptionValue.BAND, copy: CategoryCopy.BAND })"
            >
              <p>Band</p>
            </li>
            <li
              class="py-3 border-2 hover:bg-zinc-600"
              @click="handleCategoryChange({ option: OptionValue.ALBUM, copy: CategoryCopy.ALBUM })"
            >
              <p>Album</p>
            </li>
          </ul>
        </div>
        <!-- dropdown end -->

        <!-- INPUT STARTS -->
        <label
          :for="`${formData.category}-input`"
          class="absolute invisible text-white"
        >
          {{ formData.category.toUpperCase() }}
        </label>
        <input
          :id="`${formData.category}-input`"
          v-model="formData.input"
          type="text"
          :name="`${formData.category}-input`"
          class="p-2 mb-4 placeholder:text-red-600"
          :placeholder="!formData.input ? isInputError : ''"
          autofocus
          @input="isInputError = ''"
        >
        <!-- INPUT ENDS -->
      </div>
      <div
        id="submitBtn"
        role="button"
        class="relative flex items-center justify-center text-white cursor-pointer"
        :class="{ 'text-red-600': findSelected }"
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
            { 'transform translate-x-20 duration-50': findSelected }
          ]"
        />
        FIND
        <Sword
          class="bg-transparent max-w-20 rotate-[132deg] max-h-[50px] absolute right-2 transition-all duration-200 ease-in"
          :class="[
            { 'transform -translate-x-14': findHovered, },
            { 'transform -translate-x-20 duration-50': findSelected },
          ]"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue'
import Sword from '@/assets/images/sword.svg?component'
import Cross from '@/assets/images/cross.svg?component'
import Pentagram from '@/assets/images/pentagram.svg?component'
import { onClickOutside } from '@vueuse/core'
import { OptionValue, TOptionValue, IFormData, CategoryCopy, TCategoryCopy, ErrorMsg } from '@/types'

const options = ref(null)

const showCategories = ref(false)
const isInputError = ref('')
const categoryName = ref('')

const findSelected = ref(false)
const findHovered = ref(false)

const formData = ref<IFormData>({
  category: '',
  input: '',
})

const isFormReady = computed(() => formData.value.category.length && formData.value.input.length)

onClickOutside(options, () => (showCategories.value = false))

const toggleCategoriesVisibility = () => showCategories.value = !showCategories.value 

const handleCategoryChange = ({ option, copy }: {option: TOptionValue, copy: TCategoryCopy}) => {
  isInputError.value = ''
  formData.value.category = option
  categoryName.value = copy
  showCategories.value = !showCategories.value
}

const populateStorage = (): void => {
  if (isFormReady.value && chrome?.storage) {
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

const errorHandler = (formData: Ref<IFormData>) => {
  
  if (!formData.value.category) {
    formData.value.input = ''
    isInputError.value = ErrorMsg.INPUT
    return
  }
  
  if (!formData.value.input) {
    isInputError.value = ErrorMsg.CATEGORY
    return
  }
}

const handleSubmit = () => {
  findHovered.value = false
  
  if (!isFormReady.value) {
    errorHandler(formData)
    return
  }
  
  if (isFormReady.value) {
    isInputError.value = ''
    findSelected.value = true
    populateStorage()
    redirectToMA()
    setTimeout(() => {
      findSelected.value = false
    }, 300)
  }
}

</script>

<style lang="scss">
* {
  font-family: "Oswald", sans-serif;
  box-sizing: border-box;
}
</style>
