<template>
  <div class="flex flex-col items-center w-[450px] max-w-full">

    <!-- Task list with drag-and-drop without filters -->
    <ClientOnly>
      <draggable
        v-if="taskStore.filter === 'all'"
        v-model="taskStore.tasks"
        item-key="id"
        @end="onDragEnd"
        handle=".handle"
        class="flex flex-col items-center gap-y-4 h-[90px] overflow-y-auto custom-scrollbar w-full"
      >
        <template #item="{ element }">
          <Task :task="element" />
        </template>
      </draggable>
    </ClientOnly>

    <!-- Task list with filters & no drag-n-grop -->
    <ul
      v-if="taskStore.filter !== 'all'"
      class="flex flex-col items-center gap-y-4 h-[90px] overflow-y-auto custom-scrollbar w-full"
    >
      <Task v-for="task in taskStore.filteredTasks" :key="task.id" :task="task" :no-dragdrop="true" />
    </ul>

    <!-- Progress bar cards -->
    <div class="max-w-full w-content grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-2 sm:gap-y-4 mt-4 sm:mt-8">
      <ProgressBarCard
        :card="{
          count: tasks.filter(task => task.completed).length,
          tasks: tasks.length,
          status: 'completed'
        }"
      />
      <ProgressBarCard
        :card="{
          count: tasks.filter(task => !task.completed).length,
          tasks: tasks.length,
          status: 'todo'
        }"
      />
    </div>

    <!-- Task filters -->
    <Filters />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/taskStore'
import draggable from 'vuedraggable'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

// Update task order after drag-and-drop
const onDragEnd = () => {
  taskStore.updateTaskOrder([...tasks.value])
}
</script>
