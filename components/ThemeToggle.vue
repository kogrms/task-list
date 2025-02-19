<template>
  <button @click="toggleTheme" class="blue-btn p-0 h-8 w-8">
    {{ isDark ? '☀️' : '🌙' }}
  </button>
</template>

<script setup>
import { ref } from 'vue';

const isDark = ref(document.documentElement.classList.contains('dark'));

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};
</script>

