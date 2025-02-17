<template>
  <div class="flex space-x-4">
    <button
      @click="markAllCompleted"
      class="py-2 px-4 bg-green-500 text-white rounded-lg"
    >
      Отметить все
    </button>
    <button
      @click="clearCompleted"
      class="py-2 px-4 bg-red-500 text-white rounded-lg"
    >
      Очистить выполненные
    </button>
  </div>
</template>

<script setup>
const markAllCompleted = () => {
  // Логика для отметки всех задач как выполненные
  console.log('Все задачи отмечены как выполненные');
};

const clearCompleted = () => {
  // Логика для удаления выполненных задач
  console.log('Выполненные задачи очищены');
};
</script>
