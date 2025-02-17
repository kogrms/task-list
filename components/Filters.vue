<template>
  <div class="flex space-x-4">
    <button
      @click="filterTasks('all')"
      :class="{ 'text-blue-500': activeFilter === 'all' }"
      class="py-2 px-4"
    >
      Все
    </button>
    <button
      @click="filterTasks('active')"
      :class="{ 'text-blue-500': activeFilter === 'active' }"
      class="py-2 px-4"
    >
      Активные
    </button>
    <button
      @click="filterTasks('completed')"
      :class="{ 'text-blue-500': activeFilter === 'completed' }"
      class="py-2 px-4"
    >
      Выполненные
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeFilter = ref('all');

const filterTasks = (filter) => {
  activeFilter.value = filter;
  // Логика фильтрации задач
};
</script>
