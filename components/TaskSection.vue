<template>
  <div class="flex flex-col items-center w-[450px] max-w-full">
    <!-- Task list with drag-and-drop -->
    <ClientOnly>
      <draggable
        :list="filteredTasks"
        item-key="id"
        handle=".handle"
        class="flex flex-col items-center gap-y-3 sm:gap-y-2 overflow-y-auto custom-scrollbar w-full"
        :class="taskListHeight"
        @end="onDragEnd"
      >
        <template #item="{ element }">
          <Task :task="element" />
        </template>
      </draggable>
    </ClientOnly>
    <!-- Progress bar cards -->
    <div class="max-w-full w-content grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-2 sm:gap-y-4 mt-6 sm:mt-8">
      <ProgressBarCard
        :card="{
          count: tasks.filter(task => task.completed).length,
          tasks: tasks.length,
          status: 'completed',
        }"
      />
      <ProgressBarCard
        :card="{
          count: tasks.filter(task => !task.completed).length,
          tasks: tasks.length,
          status: 'todo',
        }"
      />
    </div>
    <!-- Task filters -->
    <Filters />
  </div>
</template>

<script setup>
  import { useTaskStore } from '@/stores/taskStore'
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'
  import draggable from 'vuedraggable'

  const taskStore = useTaskStore()
  const { tasks, filteredTasks } = storeToRefs(taskStore)

  const taskListHeight = computed(() => {
    return taskStore.filteredTasks.length > 3 ? 'h-32' : 'h-28 sm:h-[90px]'
  })

  // Update task order after drag-and-drop
  function onDragEnd(event) {
    const { oldIndex, newIndex } = event
    // Get the filtered tasks
    const filtered = taskStore.filteredTasks
    // Get the dragged and dropped tasks
    const draggedTask = filtered[oldIndex]
    const droppedTask = filtered[newIndex]
    // Update the task order
    if (draggedTask && droppedTask) {
      taskStore.updateTaskOrder(draggedTask.id, droppedTask.id)
    }
  }
</script>
