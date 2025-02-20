<template>
  <div class="flex flex-wrap justify-center items-center mt-2 md:mt-8 gap-1 w-[250px] min-h-[104px] sm:w-[300px] sm:min-h-[128px] md:min-h-0 md:w-full">
    <button
      v-if="!areAllTasksChecked"
      class="grey-btn"
      @click="handleCheckAll"
    >
      Check all
    </button>

    <!-- Tasks filters -->
    <div class="flex">
      <button
        :class="activeClass('all')"
        @click="taskStore.setFilter('all')"
      >
        All
      </button>
      <button
        v-if="areTasksStatusesDifferent"
        :class="activeClass('active')"
        @click="taskStore.setFilter('active')"
      >
        Active
      </button>
      <button
        v-if="areTasksStatusesDifferent"
        :class="activeClass('completed')"
        @click="taskStore.setFilter('completed')"
      >
        Completed
      </button>
    </div>

    <button
      v-if="taskStore.hasCompletedTasks"
      class="grey-btn"
      @click="handleClearCompleted"
    >
      Clear completed
    </button>
  </div>
</template>

<script setup>
  import { useTaskStore } from '@/stores/taskStore'
  import { computed } from 'vue'

  const taskStore = useTaskStore()

  const activeClass = filter => taskStore.filter === filter ? 'blue-btn' : 'grey-btn'

  const areTasksStatusesDifferent = computed(() =>
    taskStore.tasks.some(task => task.completed) && taskStore.tasks.some(task => !task.completed),
  )
  const areAllTasksChecked = computed(() => taskStore.tasks.every(task => task.completed))

  function handleCheckAll() {
    taskStore.markAllAsCompleted()
    taskStore.setFilter('all')
  }

  function handleClearCompleted() {
    taskStore.clearCompletedTasks()
    taskStore.setFilter('all')
  }
</script>
