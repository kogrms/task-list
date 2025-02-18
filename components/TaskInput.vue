<template>
  <div class="flex justify-center items-center gap-4 flex-wrap max-w-9/10">
    <input
      v-model="task"
      type="text"
      placeholder="Add new todo..."
      class="p-3 rounded-lg w-[317px] max-w-full h-10"
      @keyup.enter="addTask"
    />
    <button
      @click="addTask"
      class="blue-btn"
      v-show="task.trim()"
    >
      Submit
    </button>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useTaskStore } from '@/stores/taskStore'

  const task = ref('')
  const taskStore = useTaskStore()

  const addTask = () => {
    if (task.value.trim()) {
      taskStore.addTask(task.value.trim()) // Add to Pinia Store
      task.value = '' // Clear input
    }
  }
</script>
