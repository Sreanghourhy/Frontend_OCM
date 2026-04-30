import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Clock from '@/components/widgets/Clock.vue'

describe('Clock Component', () => {
  it('renders properly', () => {
    const wrapper = mount(Clock, {
      props: {
        size: 24
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('contains Clock element text', () => {
    const wrapper = mount(Clock, {
      props: {
        size: 24
      }
    })
    expect(wrapper.text()).toContain('Clock element')
  })

  it('applies size prop correctly', () => {
    const wrapper = mount(Clock, {
      props: {
        size: 32
      }
    })
    expect(wrapper.vm.icon.size).toBe(32)
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(Clock, {
      props: {
        size: 24
      }
    })
    const container = wrapper.find('.w-56')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('h-56')
    expect(container.classes()).toContain('m-4')
  })
})
