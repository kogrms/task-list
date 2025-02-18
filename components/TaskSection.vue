<template>
  <div class="flex flex-col items-center">

    <!-- Task list with drag-and-drop -->
    <ClientOnly>
      <Container tag="ul" @drop="onDrop" class="flex flex-col gap-y-4 h-[90px] overflow-y-auto custom-scrollbar">
        <Draggable v-for="task in taskStore.filteredTasks" :key="task.id" class="shrink-0">
          <Task :task="task" />
        </Draggable>
      </Container>
    </ClientOnly>

    <!-- Progress bar cards -->
    <div class="w-content flex justify-center gap-8 mt-8">
      <ProgressBarCard
        class="w-1/2"
        :card="{
          count: tasks.filter(task => task.completed).length,
          tasks: tasks.length,
          status: 'completed'
        }"
      />
      <ProgressBarCard
        class="w-1/2"
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
import { ref, shallowRef, onMounted } from 'vue'
import { ClientOnly } from '#components'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

const Container = shallowRef(null)
const Draggable = shallowRef(null)

// const dragHandleSelector = 'img'  // Selector for the drag handle

// Lazy load the Smooth DnD components
onMounted(async () => {
  const module = await import("vue3-smooth-dnd")
  Container.value = module.Container
  Draggable.value = module.Draggable
})

// Drag-and-drop handler
const onDrop = ({ removedIndex, addedIndex }) => {
  if (removedIndex !== null && addedIndex !== null) {
    const reorderedTasks = [...tasks.value]
    const [movedItem] = reorderedTasks.splice(removedIndex, 1)
    reorderedTasks.splice(addedIndex, 0, movedItem)
    taskStore.updateTaskOrder(reorderedTasks)
  }
}
</script>
