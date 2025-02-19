<template>
  <div
    class="flex flex-col justify-center items-center w-screen h-screen overflow-y-auto"
    style="background: linear-gradient(303.79deg, #F0C3FC -53.74%, #D7BEFC -4.64%, #BCB1FC 40.96%, #A1AEFC 83.05%, #94BDFC 127.47%, #8EC5FC 170.73%), linear-gradient(0deg, #84FAB0 0%, #85F9BC 21.87%, #88F8D7 42.19%, #8BF6F5 60.94%, #8EDDF5 80.73%, #8FD3F4 100%);"
  >
    <div class="flex flex-col items-center w-[95vw] max-w-[730px] min-h-[600px] sm:min-h-[719px] bg-white rounded-3xl px-4 py-4 sm:py-8">
      <img src="~assets/images/illustration.png" class="w-[180px] max-w-1/2 h-auto"/>
      <h1 class="text-3xl font-bold text-center py-4 sm:py-12">Today I need to</h1>
      <TaskInput class="mt-1 mb-4 sm:mb-10"/>
      <TaskSection v-if="tasks.length"/>
      <div v-else class="flex items-center justify-center gap-2 mt-auto flex-wrap">
        <img src="~assets/images/checkmark.svg" class="w-6 h-6"/>
        <p class="text-t14 text-grey-8f text-center">Congrats, you have no more tasks to do</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useTaskStore } from '@/stores/taskStore'
  import { storeToRefs } from 'pinia'

  const taskStore = useTaskStore()
  const { tasks } = storeToRefs(taskStore)
</script>
