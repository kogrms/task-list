<template>
  <div class="bg-grey-20/5 rounded-lg p-4 w-[190px] min-w-[150px]">
    <p class="text-t12 text-grey-20/50 font-semibold mb-1">{{ card.count }} tasks</p>
    <h4 class="text-t14 text-grey-20 font-bold mb-3">{{ card.status === 'completed' ? 'Completed' : 'To be finished' }}</h4>
    <div class="h-1 bg-grey-c7/50 rounded-lg">
      <div
        :style="{ width: (card.count / card.tasks) * 100 + '%' }"
        class="h-full rounded-lg min-w-[1px]"
        :class="card.status === 'completed' ? 'bg-purple' : 'bg-pink'"
      >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const { card } = defineProps({
  card: {
    type: Object,
    required: true
  }
})
</script>
