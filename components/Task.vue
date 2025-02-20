<template>
  <li
    class="flex items-center justify-between gap-4 w-[calc(100%-0.25rem)] pr-3 mr-1 h-7 rounded-md bg-white dark:bg-grey-20 shrink-0"
    :class="{ handle: isTaskDraggable && !isDesktop }"
    @mouseover="setTaskDraggable(true, true)"
    @mouseleave="setTaskDraggable(true, false)"
    @pointerdown="setTaskDraggable(false, true)"
    @pointerup="setTaskDraggable(false, false)"
  >
    <div class="flex items-center w-[70%] sm:w-[80%] md:w-[80%]">
      <div class="w-6 h-full flex justify-center items-center shrink-0">
        <!-- drag-n-drop icon -->
        <svgo-drag
          v-show="isTaskDraggable"
          class="handle w-4 h-4 cursor-grab text-grey-20/50 dark:text-white/65"
        />
      </div>
      <input
        type="checkbox"
        :checked="task.completed"
        class="w-4 h-4 cursor-pointer"
        :class="isEditing ? 'mr-2' : 'mr-3'"
        @click="toggleTask"
      >
      <div class="w-[70%] sm:w-[75%] md:w-[85%]">
        <input
          v-if="isEditing"
          ref="editInput"
          v-model="newTaskText"
          type="text"
          class="w-full px-1 py-[2px] rounded-md text-t10 h-5"
          @blur="saveTask"
          @keyup.enter="saveTask"
        >
        <h3
          v-else
          class="truncate w-full text-t12 sm:text-t14"
          :class="{ 'text-grey-20/50 dark:text-white/50': task.completed }"
        >
          {{ task.text }}
        </h3>
      </div>
    </div>
    <div class="w-14 flex justify-between items-center">
      <button
        class="lg:hover:opacity-70 w-5 h-5 flex justify-center items-center"
        @click="editTask"
      >
        <svgo-pencil class="w-3 h-3 sm:w-4 sm:h-4 text-grey-20/65 dark:text-white/65" />
      </button>
      <button
        class="lg:hover:opacity-70 w-5 h-5 flex justify-center items-center"
        @click="deleteTask"
      >
        <svgo-bin class="w-3 h-3 sm:w-4 sm:h-4 text-red" />
      </button>
    </div>
  </li>
</template>

<script setup>
  import { useTaskStore } from '@/stores/taskStore'
  import { computed, nextTick, onMounted, ref } from 'vue'

  const { task } = defineProps({
    task: {
      type: Object,
      required: true,
    },
  })
  const taskStore = useTaskStore()
  // Reactive task draggable state from store
  const isTaskDraggable = computed(() => taskStore.getTaskDraggable(task.id))

  // Detect if the device is desktop
  const isDesktop = ref(true)
  onMounted(() => {
    isDesktop.value = window.matchMedia('(hover: hover)').matches
  })

  // Local state for task editing
  const isEditing = ref(false)
  const newTaskText = ref(task.text)
  const editInput = ref(null)

  // Set task draggable state in store
  function setTaskDraggable(desktop, isDraggable) {
    if (desktop === isDesktop.value) {
      taskStore.setTaskDraggable(task.id, isDraggable)
    }
  }

  // Toggle task completion
  function toggleTask() {
    taskStore.toggleTask(task.id)
  }

  // Task editing
  function editTask() {
    isEditing.value = true
    nextTick(() => editInput.value.focus())
  }
  // Save task after editing
  function saveTask() {
    if (newTaskText.value.trim() && newTaskText.value.trim() !== task.text) {
      taskStore.updateTask(task.id, newTaskText.value.trim())
    }
    isEditing.value = false
  }

  // Delete task
  function deleteTask() {
    taskStore.removeTask(task.id)
  }
</script>
