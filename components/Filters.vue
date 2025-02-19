<template>
  <div class="flex flex-wrap justify-center items-center mt-2 sm:mt-8 gap-1 w-[250px] sm:w-[300px] md:w-full">
    <button v-if="!areAllTasksChecked" @click="handleCheckAll" class="grey-btn">
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

    <button v-if="taskStore.hasCompletedTasks" @click="handleClearCompleted" class="grey-btn">
      Clear completed
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()

const activeClass = (filter) => taskStore.filter === filter ? 'blue-btn' : 'grey-btn'

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
