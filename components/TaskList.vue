<template>
  <ul class="space-y-4 h-[90px] overflow-y-auto custom-scrollbar">
    <Task
      v-for="(task, index) in tasks"
      :key="task.id"
      :task="task"
    />
  </ul>
</template>

<script setup>
  import { useTaskStore } from '@/stores/taskStore'
  import { storeToRefs } from 'pinia'
  import Task from '@/components/Task.vue'

  const taskStore = useTaskStore()
  const { tasks } = storeToRefs(taskStore)
</script>
