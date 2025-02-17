<template>
  <div class="space-y-4">
    <div
      v-for="(task, index) in tasks"
      :key="index"
      class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
    >
      <div class="flex items-center space-x-4">
        <input
          type="checkbox"
          v-model="task.completed"
          class="w-4 h-4"
        />
        <span :class="{ 'line-through text-gray-500': task.completed }">
          {{ task.text }}
        </span>
      </div>
      <div>
        <button @click="editTask(index)" class="text-blue-500">Редактировать</button>
        <button @click="deleteTask(index)" class="text-red-500 ml-2">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tasks = ref([
  { text: 'Пример задачи 1', completed: false },
  { text: 'Пример задачи 2', completed: true },
]);

const editTask = (index) => {
  // Логика редактирования задачи
  console.log('Редактирование задачи', index);
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};
</script>
