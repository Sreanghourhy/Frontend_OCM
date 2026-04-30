<template>
  <div class="flex flex-col ">
    <!-- <label class="w-full text-left text-[15px] font-semibold text-[#1E3A8A] mb-6 border-b pb-2">
      ខ.១​​. ស្ថានភាពគ្រួសារ
    </label> -->

    <div class="flex flex-col gap-2">
  <div class="flex flex-row gap-4">
    <div class="flex items-center gap-4 flex-1">
      <!-- <span class="text-[13px] whitespace-nowrap text-[#2C3E50]">ស្ថានភាព ៖</span> -->
      <div class="flex items-center gap-6">
        <!-- Single Option -->
        <label class="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            v-model="officer.marry_status" 
            value="single"
            class="w-4 h-4 cursor-pointer"
          />
          <span class="text-[13px] text-[#2C3E50]">នៅលីវ</span>
        </label>
        
        <!-- Married Option -->
        <label class="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            v-model="officer.marry_status" 
            value="married"
            class="w-4 h-4 cursor-pointer"
          />
          <span class="text-[13px] text-[#2C3E50]">រៀបការហើយ</span>
        </label>
        
        <!-- Divorced/Widowed Option -->
        <label class="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            v-model="officer.marry_status" 
            value="divorced"
            class="w-4 h-4 cursor-pointer"
          />
          <span class="text-[13px] text-[#2C3E50]">ពោះម៉ាយ / មេម៉ាយ</span>
        </label>
      </div>
    </div>
  </div>
</div>

    
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  emits: ['changed'], // we need to inform parent that the child want to change, a child component is just blue it doesnt have life unless parent use it. If a child wants its changes to affect the parent or other parts of the app, it can’t just silently change its internal state. If a child wants its changes to affect the parent or other parts of the app, it can’t just silently change its internal state.
  props: {
    officer: { type: Object, default: undefined }  // props over is actually a parameter for parents component to pass with the type of object if no prop pass it will take defualt value which data it can be ({people: {id: 1, name: 'john doe', marry_status: 'married'}}department: hr) or some props: ['message']
  },
  setup(props, { emit }) {   // child to parent should with the brain
    const store = useStore()

    // const formData = ref({
    //   marry_status: 'single'
    // })  //form data is use store the current. tell vue to update formdata, where marry status is single without this 
    //     //with this it will show single at first render but without this when their a changes it will not render again

    // const originalValue = ref(props.officer?.people?.marry_status || 'single')

    // const hydrateData = () => {
    //   const status = props.officer?.people?.marry_status || 'single'
    //   formData.value.marry_status = status
    //   originalValue.value = status
    // }

    // const persistChanges = async () => {
    //   try {
    //     const payload = JSON.parse(JSON.stringify(props.officer))
    //     payload.people.marry_status = formData.value.marry_status

    //     const res = await store.dispatch('officer/update', payload)

    //     if (res?.status === 200) {
    //       originalValue.value = formData.value.marry_status
    //       emit('changed', false)
    //       return true
    //     }

    //     return false
    //   } catch (err) {
    //     console.error(err)
    //     return false
    //   }
    // }

    // watch(() => props.officer, hydrateData, { immediate: true, deep: true })

    // watch(() => formData.value.marry_status, (newVal) => {
    //   emit('changed', newVal !== originalValue.value, newVal)
    // })

    return {
      // formData,
      // persistChanges
    }
  }
}
</script>




<!-- 
export → makes something from this file available to other files.
export default → marks one “main thing” in the file that will be imported without curly braces.
Example 1 – exporting multiple things:
```
export const pi = 3.14
export const e = 2.71
```
To import:
```
import { pi, e } from './math.js'
```
Example 2 – default export:
```
const mathConstants = { pi: 3.14, e: 2.71 }
export default mathConstants
```
To import:
```
import constants from './math.js'
console.log(constants.pi) // 3.14
```
-->