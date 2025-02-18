<template>
  <div class="flex flex-col items-center">
    <!-- Task list -->
    <ul class="space-y-4 h-[90px] overflow-y-auto custom-scrollbar">
      <Task v-for="task in taskStore.filteredTasks" :key="task.id" :task="task" />
    </ul>

    <!-- Progress bar cards -->
    <div class="w-content flex justify-center gap-8 mt-8">
      <ProgressBarCard
        class="w-1/2"
        :card="{
          count: tasks.filter(task => task.completed).length,
          tasks: tasks.length,
          status: 'completed'
        }"
      />
      <ProgressBarCard
        class="w-1/2"
        :card="{
          count: tasks.filter(task => !task.completed).length,
          tasks: tasks.length,
          status: 'todo'
        }"
      />
    </div>

    <!-- Task filters -->
    <Filters />
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
</script>
