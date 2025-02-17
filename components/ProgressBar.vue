<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div>Выполненные</div>
      <div>{{ completedTasksCount }} / {{ totalTasksCount }}</div>
    </div>
    <progress :value="completedTasksCount" :max="totalTasksCount" class="w-full"></progress>

    <div class="flex items-center justify-between">
      <div>К выполнению</div>
      <div>{{ activeTasksCount }} / {{ totalTasksCount }}</div>
    </div>
    <progress :value="activeTasksCount" :max="totalTasksCount" class="w-full"></progress>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tasks = ref([
  { text: 'Пример задачи 1', completed: false },
  { text: 'Пример задачи 2', completed: true },
]);

const completedTasksCount = computed(() => tasks.value.filter(task => task.completed).length);
const activeTasksCount = computed(() => tasks.value.filter(task => !task.completed).length);
const totalTasksCount = computed(() => tasks.value.length);
</script>
