<template>
  <div class="flex justify-center items-center gap-2 sm:gap-4 max-w-full">
    <input
      v-model="task"
      type="text"
      placeholder="Add new todo..."
      class="input"
      @keyup.enter="addTask"
    >
    <button
      v-show="task.trim()"
      class="blue-btn"
      @click="addTask"
    >
      Submit
    </button>
  </div>
</template>

<script setup>
  import { useTaskStore } from '@/stores/taskStore'
  import { ref } from 'vue'

  const task = ref('')
  const taskStore = useTaskStore()

  function addTask() {
    if (task.value.trim()) {
      taskStore.addTask(task.value.trim()) // Add to Pinia Store
      task.value = '' // Clear input
    }
  }
</script>
