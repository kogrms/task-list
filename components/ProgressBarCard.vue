<template>
  <div class="bg-grey-20/5 dark:bg-grey-c7/20 rounded-lg p-4 w-full min-w-[150px]">
    <div class="flex flex-row-reverse justify-between sm:flex-col sm:items-start gap-1 mb-3">
      <p class="text-t12 text-grey-20/50 dark:text-white/50 font-semibold">
        {{ card.count }} tasks
      </p>
      <h4 class="text-t12 sm:text-t14 text-grey-20 dark:text-white font-bold">
        {{ card.status === 'completed' ? 'Completed' : 'To be finished' }}
      </h4>
    </div>
    <div class="h-1 bg-grey-c7/50 dark:bg-white/20 rounded-lg">
      <div
        :style="{ width: `${(card.count / card.tasks) * 100}%` }"
        class="h-full rounded-lg min-w-[1px]"
        :class="card.status === 'completed' ? 'bg-purple' : 'bg-pink'"
      />
    </div>
  </div>
</template>

<script setup>
  const { card } = defineProps({
    card: {
      type: Object,
      required: true,
    },
  })
</script>
