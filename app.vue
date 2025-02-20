<template>
  <div
    class="relative flex flex-col justify-center items-center w-screen h-screen overflow-y-auto"
    style="background: linear-gradient(303.79deg, #F0C3FC -53.74%, #D7BEFC -4.64%, #BCB1FC 40.96%, #A1AEFC 83.05%, #94BDFC 127.47%, #8EC5FC 170.73%), linear-gradient(0deg, #84FAB0 0%, #85F9BC 21.87%, #88F8D7 42.19%, #8BF6F5 60.94%, #8EDDF5 80.73%, #8FD3F4 100%);"
  >
    <!-- Dark theme background filter -->
    <div class="absolute inset-0 bg-black opacity-0 dark:opacity-30 pointer-events-none w-full h-full z-10"></div>

    <div class="relative z-20 flex flex-col items-center w-[95vw] max-w-[730px] min-h-[500px] md:min-h-[719px] bg-white dark:bg-grey-20 rounded-3xl px-4 py-6 sm:py-8">
    
      <ThemeToggle class="absolute top-6 sm:top-8 right-4 sm:right-8" />

      <img src="/illustration.png" class="w-[180px] max-w-1/3 md:max-w-[180px] dark:opacity-80"/>

      <h1 class="text-3xl font-bold text-center py-4 sm:py-12">Today I need to</h1>

      <TaskInput class="mt-1 mb-6 sm:mb-10"/>

      <TaskSection v-if="tasks.length && !loading"/>

      <div v-if="!tasks.length && !loading" class="flex items-center justify-center gap-2 mt-auto flex-wrap">
        <svgo-checkmark
          class="w-4 h-4 sm:w-6 sm:h-6 text-grey-8f shrink-0"
          :font-controlled="false"
          :filled="true"
        />
        <p class="text-t12 sm:text-t14 text-grey-8f text-center">Congrats, you have no more tasks to do</p>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center h-full">
        <Loader />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import Loader from '@/components/Loader.vue'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

const loading = storeToRefs(taskStore).loading

onMounted(() => {
  taskStore.fetchTasks()
})
</script>
