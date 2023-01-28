import { expect, test } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import CategoryForm from '@/components/CategoryForm.vue'
import { ErrorMsg } from '@/types'

describe('CategoryForm component', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(CategoryForm)
  })

  test('should have a dropdown menu and input field', () => {
    expect(wrapper.find('#search-form').exists()).toBe(true)
    expect(wrapper.find('.categories__header').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  test('shoud be able to see all the available categories', async () => {
    const category = wrapper.find('.categories__header')
    await category.trigger('click')
    
    const availableCategories = ['Band', 'Album']

    wrapper.findAll('.category-item').forEach((item) => {
      expect(availableCategories).toContain(item.text())
    })
  })

  test('should be able to select a category', async () => {
    const category = wrapper.find('.categories__header')

    await category.trigger('click')
    let option = wrapper.findAll('.category-item')[0]
    await option?.trigger('click')
    expect(category.text()).toEqual(option.text())

    await category.trigger('click')
    option = wrapper.findAll('.category-item')[1]
    await option?.trigger('click')
    expect(category.text()).toEqual(option.text())
  })

  test('should set the correct error message', async () => {
    const submitBtn = wrapper.find('#submitBtn')
    await submitBtn.trigger('click')
    expect(wrapper.find('input[id*=-input]').attributes().placeholder).toEqual(ErrorMsg.CATEGORY)

    const category = wrapper.find('.categories__header')
    await category.trigger('click')
    const option = wrapper.findAll('.category-item')[0]
    await option?.trigger('click')
    await submitBtn.trigger('click')
    expect(wrapper.find('input[id*=-input]').attributes().placeholder).toEqual(ErrorMsg.INPUT)
  })
})