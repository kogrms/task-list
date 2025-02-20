<template>
  <p class="text-t12 sm:text-t14 text-grey-8f mt-2">
    Loading{{ dots }}
  </p>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const dots = ref('')
let intervalId

onMounted(() => {
  intervalId = setInterval(() => {
    dots.value = dots.value.length < 3 ? dots.value + '.' : '.'
  }, 150)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>
