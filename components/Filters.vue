<template>
  <div class="flex flex-wrap justify-center items-center mt-8 gap-1">
    <button v-if="!areAllTasksChecked" @click="handleCheckAll" class="btn">
      Check all
    </button>

    <!-- Tasks filters -->
    <div class="flex">
      <button @click="taskStore.setFilter('all')" :class="activeClass('all')">
        All
      </button>
      <button v-if="areTasksStatusesDifferent" @click="taskStore.setFilter('active')" :class="activeClass('active')">
        Active
      </button>
      <button v-if="areTasksStatusesDifferent" @click="taskStore.setFilter('completed')" :class="activeClass('completed')">
        Completed
      </button>
    </div>

    <button v-if="taskStore.hasCompletedTasks" @click="handleClearCompleted" class="btn">
      Clear completed
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()

const activeClass = (filter) => taskStore.filter === filter ? 'btn-active' : 'btn'

const areTasksStatusesDifferent = computed(() => 
  taskStore.tasks.some(task => task.completed) && taskStore.tasks.some(task => !task.completed)
)
const areAllTasksChecked = computed(() => taskStore.tasks.every(task => task.completed))

const handleCheckAll = () => {
  taskStore.markAllAsCompleted()
  taskStore.setFilter('all')
}

const handleClearCompleted = () => {
  taskStore.clearCompletedTasks()
  taskStore.setFilter('all')
}
</script>

<style scoped>
.btn {
  @apply text-t13 font-semibold flex justify-center items-center h-8 px-3 rounded-lg text-grey-20 lg:hover:bg-grey-20/5;
}
.btn-active {
  @apply text-t13 font-semibold flex justify-center items-center h-8 px-3 rounded-lg bg-blue text-white lg:hover:bg-blue/80;
}
</style>
