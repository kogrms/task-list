<template>
  <li
    class="flex items-center justify-between gap-4 w-[calc(100%-0.25rem)] pr-3 mr-1 h-7 rounded-md bg-white dark:bg-grey-20 shrink-0"
    :class="{ 'handle': isDesktopDraggable || isMobileDraggable }"
    @mouseover="showDragHandle"
    @mouseleave="hideDragHandle"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <div class="flex items-center w-[70%] sm:w-[80%] md:w-[80%]">
      <div class="w-6 h-full flex justify-center items-center shrink-0">
        <!-- drag-n-drop icon on hover (desktops) or on long tap (mobiles/tablets) -->
        <svgo-drag
          v-show="isDesktopDraggable || isMobileDraggable"
          class="w-4 h-4 cursor-grab text-grey-20/50 dark:text-white/65"
          :class="{ 'handle': isDesktopDraggable }"
        />
      </div>
      <input
        type="checkbox"
        v-model="task.completed"
        @click="toggleTask"
        class="w-4 h-4 cursor-pointer"
        :class="isEditing ? 'mr-2' : 'mr-3'"
      />
      <div class="w-[70%] sm:w-[75%] md:w-[85%]">
        <input
          v-if="isEditing"
          ref="editInput"
          type="text"
          v-model="newTaskText"
          @blur="saveTask"
          @keyup.enter="saveTask"
          class="w-full px-1 py-[2px] rounded-md text-t10 h-5"
        />
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
      <button @click="editTask" class="lg:hover:opacity-70 w-5 h-5 flex justify-center items-center">
        <svgo-pencil class="w-3 h-3 sm:w-4 sm:h-4 text-grey-20/65 dark:text-white/65" />
      </button>
      <button @click="deleteTask" class="lg:hover:opacity-70 w-5 h-5 flex justify-center items-center">
        <svgo-bin class="w-3 h-3 sm:w-4 sm:h-4 text-red" />
      </button>
    </div>
  </li>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const { task, noDragdrop } = defineProps({
  task: {
    type: Object,
    required: true
  },
  noDragdrop: {
    type: Boolean,
    default: false
  }
})
const taskStore = useTaskStore()

// Local state for editing
const isEditing = ref(false)
const newTaskText = ref(task.text)
const editInput = ref(null)

const isDesktopDraggable = ref(false) // Enable drag-n-drop for desktops
const isMobileDraggable = ref(false) // Enable drag-n-drop for mobiles/tablets
let touchTimer = null

const toggleTask = () => {
  taskStore.toggleTask(task.id) // Toggle task completion state in Pinia
}

const editTask = () => {
  isEditing.value = true // Enter edit mode
  nextTick(() => {
    editInput.value.focus() // Focus input after DOM update
  })
}

const saveTask = () => {
  if (newTaskText.value.trim() && newTaskText.value.trim() !== task.text) {
    taskStore.updateTask(task.id, newTaskText.value.trim()) // Save updated task to Pinia
    task.text = newTaskText.value.trim() // Update local task text
  } else {
    newTaskText.value = task.text // Reset input if empty or unchanged
  }
  isEditing.value = false // Exit edit mode
}

const deleteTask = () => {
  taskStore.removeTask(task.id) // Delete task from Pinia
}

const showDragHandle = () => {
  if (!noDragdrop) {
    isDesktopDraggable.value = true // Show drag handle on hover (desktop)
  }
}

const hideDragHandle = () => {
  isDesktopDraggable.value = false // Hide drag handle on hover out (desktop)
}

// For mobile devices, detect long tap to show drag handle
const handleTouchStart = () => {
  if (!noDragdrop) {
    touchTimer = setTimeout(() => {
      isMobileDraggable.value = true // Show drag handle after long tap
    }, 500) // Adjust the time for long tap detection (500ms)
  }
}

const handleTouchEnd = () => {
  clearTimeout(touchTimer) // Reset timer if touch ends before long tap
  isMobileDraggable.value = false // Hide drag handle after touch end
}
</script>
