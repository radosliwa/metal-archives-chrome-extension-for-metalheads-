<template>
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
            {{ selectedCategory && !showCategories ? selectedCategory : "Choose category" }}
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
            v-for="(option, i) in OptionValue"
            :key="option + i"
            class="py-3 border-x-2 hover:bg-zinc-600 category-item"
            @click="handleCategoryChange(option)"
          >
            <p>{{ CategoryCopy[option] }}</p>
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
        autocomplete="on"
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
        class="bg-transparent max-w-20 rotate-[-47deg] max-h-[50px] absolute left-2 transition-all
         duration-200 ease-in"
        :class="[
          { 'transform translate-x-14': findHovered },
          { 'transform translate-x-20 duration-50': findSelected }
        ]"
      />
      FIND
      <Sword
        class="bg-transparent max-w-20 rotate-[132deg] max-h-[50px] absolute right-2
         transition-all duration-200 ease-in"
        :class="[
          { 'transform -translate-x-14': findHovered, },
          { 'transform -translate-x-20 duration-50': findSelected },
        ]"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { CategoryCopy, ErrorMsg, IFormData, OptionValue, TCategoryCopy, TOptionValue }
  from '@/types'
import { computed, ref } from 'vue'
import Cross from '@/assets/images/cross.svg?component'
import Sword from '@/assets/images/sword.svg?component'
import { onClickOutside } from '@vueuse/core'

const emit = defineEmits<{
  (e: 'redirect-to-ma'): void
}>()

const options = ref(null)

const showCategories = ref(false)
const isInputError = ref('')
const selectedCategory = ref<TCategoryCopy | ''>('')

const findSelected = ref(false)
const findHovered = ref(false)

const formData = ref<IFormData>({
  category: '',
  input: '',
})

const isFormReady = computed(() => formData.value.category.length && formData.value.input.length)

onClickOutside(options, () => (showCategories.value = false))

const toggleCategoriesVisibility = () => showCategories.value = !showCategories.value 

const handleCategoryChange = (option: TOptionValue) => {
  isInputError.value = ''
  formData.value.category = option
  if (option) selectedCategory.value = CategoryCopy[option]
  showCategories.value = !showCategories.value
}

const populateStorage = (): void => {
  if (isFormReady.value && chrome?.storage) {
    chrome.storage.sync.set({ 'ma-structure': JSON.stringify(formData.value) })
  }
}

const redirectToMA = () => emit('redirect-to-ma')

const errorHandler = (formData: IFormData) => {
  
  if (!formData.category) {
    formData.input = ''
    isInputError.value = ErrorMsg.CATEGORY
    return
  }
  
  if (!formData.input) {
    isInputError.value = ErrorMsg.INPUT
    return
  }
}

const handleSubmit = () => {
  findHovered.value = false
  
  if (!isFormReady.value) {
    errorHandler(formData.value)
    return
  }
  
  isInputError.value = ''
  findSelected.value = true
  populateStorage()
  redirectToMA()
  setTimeout(() => {
    findSelected.value = false
  }, 300)
}

</script>