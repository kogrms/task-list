<template>
  <div class="flex items-center gap-4">
    <input
      v-model="task"
      type="text"
      placeholder="Add new todo..."
      class="p-3 rounded-lg w-[317px] h-10"
    />
    <button
      @click="addTask"
      :disabled="!task"
      class="blue-btn"
      v-show="task"
    >
      Submit
    </button>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const task = ref('');

  const addTask = () => {
    if (task.value.trim()) {
      // Добавляем задачу в список
      console.log('Задача добавлена:', task.value);
      task.value = '';
    }
  };
</script>
